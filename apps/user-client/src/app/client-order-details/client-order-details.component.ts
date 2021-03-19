import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Order } from '@wise-guy/data';

@Component({
  selector: 'app-order-details',
  templateUrl: './client-order-details.component.html',
  styleUrls: ['./client-order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientOrderDetailsComponent {
  @Input() order: Order;

  constructor() { }
}
