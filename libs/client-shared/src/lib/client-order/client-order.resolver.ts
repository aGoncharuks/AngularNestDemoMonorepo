import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Order } from '@wise-guy/data';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrderState, selectOrder } from '../client-store/client-store-order.reducer';

@Injectable({providedIn: 'root'})
export class OrderResolver implements Resolve<Order> {
  constructor(private store: Store<OrderState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
    return this.store.pipe(
      select(selectOrder, {id: route.paramMap.get('id')}),
      first()
    );
  }
}
