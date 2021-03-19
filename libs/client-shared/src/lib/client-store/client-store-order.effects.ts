import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppConfig, CLIENT_CONFIG, CLIENT_ENVIRONMENT, ClientEnvironment } from '@wise-guy/data';
import { map, switchMap } from 'rxjs/operators';
import { ClientOrderFacadeService } from '../client-order/client-order.facade.service';
import * as OrderActions from './client-store-order.actions';

@Injectable()
export class ClientStoreOrderEffects {
  loadOrders$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() => this.facade.getAll$()),
      map(orders => OrderActions.loadedOrders({orders}))
    )
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private facade: ClientOrderFacadeService,
    @Inject(CLIENT_ENVIRONMENT) private environment: ClientEnvironment,
    @Inject(CLIENT_CONFIG) private config: AppConfig
  ) {}
}
