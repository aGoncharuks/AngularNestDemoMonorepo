import { Module } from '@nestjs/common';
import { ApiDbService } from './api-db.service';

@Module({
  controllers: [],
  providers: [ApiDbService],
  exports: [ApiDbService],
})
export class ApiDbModule {}
