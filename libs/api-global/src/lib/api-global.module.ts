import { Module } from '@nestjs/common';
import { APP_CONFIG_RE } from '@wise-guy/config';
import { API_CONFIG, API_ENVIRONMENT, ApiEnvironment } from '@wise-guy/data';

@Module({})
export class ApiGlobalModule {
  static forRoot(config: ApiEnvironment) {
    const providers = [
      {
        provide: API_ENVIRONMENT,
        useValue: config
      },
      {
        provide: API_CONFIG,
        useValue: APP_CONFIG_RE
      }
    ];
    return {
      global: true,
      module: ApiGlobalModule,
      providers,
      exports: providers
    }
  }
}
