import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiAuthGuard } from '@wise-guy/api-auth';
import { GenericResponse } from '@wise-guy/data';
import { ApiNotificationsService } from './api-notifications.service';

@Controller('notification')
export class ApiNotificationsController {
  constructor(private apiNotificationsService: ApiNotificationsService) {}

  @Post('register-subscription')
  @UseGuards(ApiAuthGuard)
  async registerSubscription(
    @Body() subscription: PushSubscription,
    @Req() {userId}
  ): Promise<GenericResponse> {
    return await this.apiNotificationsService.registerSubscription({ subscription, userId });
  }

}
