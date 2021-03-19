import { Module } from '@nestjs/common';
import { ApiDbModule } from '@wise-guy/api-db';
import { ApiNotificationsModule } from '@wise-guy/api-notifications';
import { ApiOrderModule } from '@wise-guy/api-order';
import { ApiStackController } from './api-stack.controller';
import { ApiStackService } from './api-stack.service';

@Module({
  imports: [
    ApiDbModule,
    ApiNotificationsModule,
    ApiOrderModule
  ],
  controllers: [ApiStackController],
  providers: [ApiStackService]
})
export class ApiStackModule {}
