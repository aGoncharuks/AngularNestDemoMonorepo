import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AppConfig, CLIENT_CONFIG, Order } from '@wise-guy/data';

@Component({
  selector: 'app-dashboard-order-list',
  templateUrl: './client-dashboard-order-list.component.html',
  styleUrls: ['./client-dashboard-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDashboardOrderListComponent {
  @Input() orders: Order[];
  @Output() selectOrder = new EventEmitter<string>();
  @Output() editOrder = new EventEmitter<string>();
  @Output() deleteOrder = new EventEmitter<Order>();

  constructor(@Inject(CLIENT_CONFIG) public config: AppConfig) {
  }

  public emitSelectOrder(id: string): void {
    this.selectOrder.next(id);
  }

  public emitEditOrder(id: string): void {
    this.editOrder.next(id);
  }

  public emitDeleteOrder(order: Order): void {
    this.deleteOrder.next(order);
  }
}
