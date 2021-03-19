import { Inject, Injectable } from '@nestjs/common';
import { ApiDbService } from '@wise-guy/api-db';
import { ApiNotificationsService } from '@wise-guy/api-notifications';
import { API_CONFIG, AppConfig, DBCollection, GenericResponse, Order, OrderPriority, OrderType } from '@wise-guy/data';
import { ChangeEventCR, ChangeEventUpdate, DeleteWriteOpResultObject, FilterQuery } from 'mongodb';
import { forkJoin, from, noop, of } from 'rxjs';
import { catchError, map, mergeMap, reduce } from 'rxjs/operators';

@Injectable()
export class ApiOrderService {
  constructor(private dbService: ApiDbService,
              @Inject(API_CONFIG) private config: AppConfig,
              private notificationsService: ApiNotificationsService) {
    this.startListeningToOrderStreams();
  }

  async allUserOrders(userId: string): Promise<Order[]> {
    return forkJoin(
      from<Promise<Order[]>>(this.dbService.findAll(DBCollection.BID, {userId})),
      from<Promise<Order[]>>(this.dbService.findAll(DBCollection.OFFER, {userId}))
    ).pipe(
      map(([bids, offers]) => ([...bids, ...offers]))
    ).toPromise();
  }

  async newOrder(order: Order): Promise<GenericResponse> {
    return this.dbService.insertOne(
      order.type as unknown as DBCollection,
      order
    );
  }

  async replaceOrder(order: Order): Promise<GenericResponse> {
    const { _id, ...rest } = order;
    return this.dbService.replaceOne(
      order.type as unknown as DBCollection,
     _id,
      { ...rest }
    );
  }

  async deleteOrder({_id, type}): Promise<DeleteWriteOpResultObject> {
    return this.dbService.deleteOne(
      type as unknown as DBCollection,
      _id
    );
  }

  async getAllMatchingOrders(userId: string): Promise<Order[]> {
    return from(await this.allUserOrders(userId)).pipe(
      mergeMap(order => from(this.getMatchingOrders(order)).pipe(
        catchError(() => of([])),
        map(matches => ({
          matches,
          matchFor: {
            _id: order._id,
            displayName: order[this.config.displayNameField]
          }
        }))
      )),
      reduce(this.toOrderMapById, {}),
      map(ordersById => Object.values(ordersById))
    ).toPromise();
  }

  getMatchingOrders(order): Promise<Order[]> {
    return this.dbService.findAll(
      this.getOrderMatchDBCollection(order),
      this.getOrderMatchQuery(order)
    )
  }

  private getOrderMatchDBCollection(order: Order): DBCollection {
    return order.type === OrderType.BID ? DBCollection.OFFER : DBCollection.BID;
  }

  private toOrderMapById(acc: {[key: string]: Order}, { matches, matchFor }): {[key: string]: Order} {
    matches.forEach(match => {
      if (acc[match._id]) {
        acc[match._id].matchFor.push(matchFor);
        return;
      }
      acc[match._id] = {...match, matchFor: [matchFor]};
    })
    return acc;
  }

  private startListeningToOrderStreams(): void {
    this.dbService.connected.then(() => {
      [
        DBCollection.BID,
        DBCollection.OFFER
      ].forEach(collection =>
        this.setupNotificationsForCollection(collection)
      );
    });
  }

  private setupNotificationsForCollection(collection: DBCollection): void {
      const changeStream = this.dbService.watch(collection);
      console.log('setupNotificationsForCollection');

      changeStream.on('change', event => {
        if (!['insert', 'update', 'replace'].includes(event.operationType)) {
          return;
        }
        const order = (event as ChangeEventCR | ChangeEventUpdate).fullDocument;
        this.notifyAllRelevantUsersOnNewOrder(order).then(noop);
      });
  }

  private getOrderMatchQuery(order: Order): FilterQuery<Order> {
    return this.config.orderFields.reduce((acc, field) => {
      const key = field.key as string;
      if (!order[key] || field.priority !== OrderPriority.FIRST) { return acc; }
      return {
        ...acc,
        ...field.matchQueryFactory(order)
      };
    }, {})
  }

  private async notifyAllRelevantUsersOnNewOrder(order): Promise<void> {
    return new Promise(async resolve => {
      const matchingOrders = await this.getMatchingOrders(order);
      const usersToNotify = this.extractUserIdsSetFromOrders(matchingOrders);
      console.log({usersToNotify});
      usersToNotify.forEach(userId => this.notifyUserOnNewOrder(order, userId))
      console.log({usersToNotify, subscriptions: this.notificationsService.subscriptions});
      resolve();
    });
  }

  private notifyUserOnNewOrder(order, userId): void {
    if (!this.notificationsService.subscriptions[userId]?.length) { return; }
    this.notificationsService.subscriptions[userId].forEach(subscription => {
      this.notificationsService.sendNotification(
        this.config.newOrderNotificationFactory(order),
        subscription
      ).then(noop, error => {
        console.error(`Error notifying userId ${userId}: `, error);
      });
    })
  }

  private extractUserIdsSetFromOrders(orders: Order[]): Set<string> {
    return orders.reduce((acc, order) =>
      acc.add(order.userId), new Set<string>()
    );
  }
}
