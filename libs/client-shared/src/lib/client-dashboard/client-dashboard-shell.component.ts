import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPageRoute, Order } from '@wise-guy/data';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loadOrders } from '../client-store/client-store-order.actions';
import { selectOrderAll } from '../client-store/client-store-order.reducer';
import { ClientDashboardFacadeService } from './client-dashboard-facade.service';

@Component({
  selector: 'wise-guy-dashboard-shell',
  templateUrl: './client-dashboard-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDashboardShellComponent implements OnInit {
  public orders$: Observable<Order[]> = this.store.pipe(
    select(selectOrderAll)
  );

  constructor(private facade: ClientDashboardFacadeService,
              private store: Store,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(loadOrders());
  }

  public onSelectOrder(id: string): void {
    this.router.navigate([AppPageRoute.ORDER_INFO, id]);
  }

  public onEditOrder(id: string): void {
    this.router.navigate([AppPageRoute.ORDER_FORM, id]);
  }

  public onDeleteOrder(order: Order): void {
    this.facade.deleteOrder(order).pipe(
      tap(() => this.store.dispatch(loadOrders()))
    ).subscribe();
  }
}
