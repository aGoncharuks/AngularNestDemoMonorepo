import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiAuthGuard } from '@wise-guy/api-auth';
import { Order } from '@wise-guy/data';
import { ApiStackService } from './api-stack.service';

@Controller('stack')
export class ApiStackController {
  constructor(private stackService: ApiStackService) {
  }

  @Post('matches')
  @UseGuards(ApiAuthGuard)
  async getStack(@Body() {userId}): Promise<Order[]> {
    return await this.stackService.getStack(userId);
  }
}
