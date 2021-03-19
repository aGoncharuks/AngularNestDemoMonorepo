import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConfig, Order } from '@wise-guy/data';

@Component({
  selector: 'app-stack-order-list',
  templateUrl: './client-stack-order-list.component.html',
  styleUrls: ['./client-stack-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientStackOrderListComponent {
  @Output() orderSelect = new EventEmitter<Order>();
  @Input() stack: Order[];
  @Input() config: AppConfig;

  constructor() { }

  public emitOrderSelect(order: Order) {
    this.orderSelect.next(order);
  }
}
