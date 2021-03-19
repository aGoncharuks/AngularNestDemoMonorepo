import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnyObject, AppConfig, CLIENT_CONFIG, FieldConfig, Order } from '@wise-guy/data';
import {
  getFixedCondition,
  getPresetValue,
  toFlatOrderModel
} from '@wise-guy/client-shared';

@Component({
  selector: 'app-order-form',
  templateUrl: './client-order-form.component.html',
  styleUrls: ['./client-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientOrderFormComponent implements OnInit {
  @Output() newOrder = new EventEmitter<Order>();
  @Output() replaceOrder = new EventEmitter<Order>();
  @Input() order: Order = undefined;
  public form = new FormGroup({});
  public fields: FieldConfig[] = [];
  public model: AnyObject = {};

  constructor(
    @Inject(CLIENT_CONFIG) private config: AppConfig
  ) {}

  ngOnInit() {
    this.fields = this.config.orderFields;
    if (this.order) {
      this.fields.forEach(field => {
        this.model[field.key as string] = getPresetValue(field, this.order);
        field.templateOptions.disabled = getFixedCondition(field, this.order);
      });
    }
  }

  public submitOrder(): void {
    if (this.order) {
      this.emitReplaceOrder();
    } else {
      this.emitNewOrder();
    }
  }

  private emitNewOrder(): void {
    this.newOrder.next(toFlatOrderModel(this.model, this.fields));
  }

  private emitReplaceOrder(): void {
    this.replaceOrder.next({
      _id: this.order._id,
      ...toFlatOrderModel(this.model, this.fields)
    });
  }
}
