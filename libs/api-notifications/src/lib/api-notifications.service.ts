import { Inject, Injectable } from '@nestjs/common';
import { API_CONFIG, API_ENVIRONMENT, ApiEnvironment, AppConfig, GENERIC_RESPONSE, GenericResponse } from '@wise-guy/data';
import { SendResult } from 'web-push';

const webpush = require('web-push');

@Injectable()
export class ApiNotificationsService {
  subscriptions: { [key: string]: PushSubscription[] } = {};
  constructor(@Inject(API_ENVIRONMENT) private environment: ApiEnvironment,
              @Inject(API_CONFIG) private config: AppConfig) {
    this.setVapidDetails();
  }

  registerSubscription(
    { subscription, userId }: {subscription: PushSubscription, userId: string}
  ): Promise<GenericResponse> {
    return new Promise((resolve) => {
      this.tryAddSubscription({subscription, userId});
      resolve(GENERIC_RESPONSE.OK);
    })
  }

  sendNotification(notification: unknown, subscription): Promise<SendResult> {
    return webpush.sendNotification(subscription, JSON.stringify(notification))
      .catch(error => console.error('Error sending notification: ', error));
  }

  private setVapidDetails(): void {
    webpush.setVapidDetails(
      `mailto:${this.environment.EMAIL}`,
      this.environment.VAPID_PUBLIC_KEY,
      this.environment.VAPID_PRIVATE_KEY
    )
  }

  private tryAddSubscription(
    { subscription, userId }: {subscription: PushSubscription, userId: string}
  ): void {
    if (this.isAlreadySubscribed({ subscription, userId })) { return; }

    if (this.subscriptions[userId]) {
      this.subscriptions[userId].push(subscription);
      return;
    }

    this.subscriptions[userId] = [subscription];
  }

  private isAlreadySubscribed({ subscription, userId }): boolean {
    return !!this.subscriptions[userId]?.find(item => item.endpoint === subscription.endpoint);
  }
}
