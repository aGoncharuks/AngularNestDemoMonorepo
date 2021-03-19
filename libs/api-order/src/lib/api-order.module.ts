import { Module } from '@nestjs/common';
import { ApiDbModule } from '@wise-guy/api-db';
import { ApiNotificationsModule } from '@wise-guy/api-notifications';
import { ApiOrderService } from './api-order.service';
import { ApiOrderController } from './api-order.controller';

@Module({
  imports: [
    ApiDbModule,
    ApiNotificationsModule
  ],
  controllers: [ApiOrderController],
  providers: [ApiOrderService],
  exports: [ApiOrderService],
})
export class ApiOrderModule {}
