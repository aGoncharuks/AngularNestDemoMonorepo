import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiAuthGuard } from '@wise-guy/api-auth';
import { GenericResponse, Order } from '@wise-guy/data';
import { DeleteWriteOpResultObject } from 'mongodb';
import { ApiOrderService } from './api-order.service';

@Controller('order')
export class ApiOrderController {
  constructor(private apiOrderService: ApiOrderService) {}

  @Get('all')
  @UseGuards(ApiAuthGuard)
  async allUserOrders(@Req() request, @Req() {userId}): Promise<Order[]> {
    return this.apiOrderService.allUserOrders(userId);
  }

  @Post('new')
  @UseGuards(ApiAuthGuard)
  async newOrder(@Body() order: Order, @Req() {userId}): Promise<GenericResponse> {
    return this.apiOrderService.newOrder({...order, userId});
  }

  @Post('replace')
  @UseGuards(ApiAuthGuard)
  async editOrder(@Body() order: Order, @Req() {userId}): Promise<GenericResponse> {
    return this.apiOrderService.replaceOrder({...order, userId});
  }

  @Post('delete')
  @UseGuards(ApiAuthGuard)
  async deleteOrder(@Body() body): Promise<DeleteWriteOpResultObject> {
    return this.apiOrderService.deleteOrder(body);
  }
}
