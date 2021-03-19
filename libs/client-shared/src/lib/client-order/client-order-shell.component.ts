import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPageRoute, Order } from '@wise-guy/data';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { selectOrder } from '../client-store/client-store-order.reducer';
import { ClientOrderFacadeService } from './client-order.facade.service';

@Component({
  selector: 'wise-guy-order-shell',
  templateUrl: './client-order-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientOrderShellComponent {
  public order$: Observable<Order> = this.route.paramMap.pipe(
    map(params => params.get('id')),
    switchMap((id: string) => {
      if (id === 'new') {
        return EMPTY;
      }
      return this.store.pipe(
        select(selectOrder, {id})
      )
    })
  );

  constructor(private facade: ClientOrderFacadeService,
              private route: ActivatedRoute,
              private store: Store,
              private router: Router) { }


  onNewOrder(order: Order): void {
    this.facade.newOrder$(order).pipe(
      tap(() => this.returnToDashboard())
    ).subscribe();
  }

  onReplaceOrder(order: Order): void {
    this.facade.replaceOrder$(order).pipe(
      tap(() => this.returnToDashboard())
    ).subscribe();
  }

  private returnToDashboard(): void {
    this.router.navigate([AppPageRoute.DASHBOARD]);
  }
}
