import { Injectable } from '@nestjs/common';
import { ApiOrderService } from '@wise-guy/api-order';
import { Order } from '@wise-guy/data';

@Injectable()
export class ApiStackService {
  constructor(private orderService: ApiOrderService) {}

  async getStack(userId: string): Promise<Order[]> {
    const stack = await this.orderService.getAllMatchingOrders(userId);
    return new Promise((resolve) => {
      resolve(stack);
    });
  }
}
