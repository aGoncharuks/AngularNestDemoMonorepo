import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ApiAuthMiddleware, ApiAuthModule } from '@wise-guy/api-auth';
import { ApiGlobalModule } from '@wise-guy/api-global';
import { ApiNotificationsModule } from '@wise-guy/api-notifications';
import { ApiOrderModule } from '@wise-guy/api-order';
import { ApiStackModule } from '@wise-guy/api-stack';
import { environment } from '../environments/environment';

const API_MODULES = [
  ApiStackModule,
  ApiNotificationsModule,
  ApiOrderModule
];

@Module({
  imports: [
    ...API_MODULES,
    ApiAuthModule,
    ApiGlobalModule.forRoot(environment)
  ]
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
