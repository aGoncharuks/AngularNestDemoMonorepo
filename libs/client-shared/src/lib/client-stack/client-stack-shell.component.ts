import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ClientAuthService } from '@wise-guy/client-auth';
import { ClientNotificationsService } from '@wise-guy/client-notifications';
import { AppConfig, CLIENT_CONFIG, CLIENT_ENVIRONMENT, ClientEnvironment, Order } from '@wise-guy/data';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ClientOrderFacadeService } from '../client-order/client-order.facade.service';

@Component({
  selector: 'wise-guy-stack-shell',
  templateUrl: './client-stack-shell.component.html',
  styleUrls: ['./client-stack-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientStackShellComponent {
  $stack: Observable<Order[]> = this.authService.userProfile$.pipe(
    switchMap(({ sub: userId }) => this.facade.getStack$({ userId })),
    tap(orders => this.onOrderSelect(orders[0]))
  )
  selectedOrder: Order;

  constructor(
    private facade: ClientOrderFacadeService,
    private notificationsService: ClientNotificationsService,
    @Inject(CLIENT_ENVIRONMENT) private environment: ClientEnvironment,
    private authService: ClientAuthService,
    @Inject(CLIENT_CONFIG) public config: AppConfig,
  ) {
    /** @TODO subscribe in APP_INITIALIZER(?) */
    if (this.environment.production) {
      this.notificationsService.trySubscribeToNotifications();
    }
  }

  public onOrderSelect(order: Order): void {
    this.selectedOrder = order;
  }
}
