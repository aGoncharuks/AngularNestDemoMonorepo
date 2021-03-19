import { Global, Module } from '@nestjs/common';
import { API_ENVIRONMENT, ApiEnvironment, AuthOptions, AUTH_CLIENT } from '@wise-guy/data';
import { createJwksRsaClient, getAuthOptionsFromApiEnvironment } from './api-auth.function';

export function jwksRsaClientFactory(environment: ApiEnvironment) {
  const authOptions: AuthOptions = getAuthOptionsFromApiEnvironment(environment);
  return {
    authOptions,
    jwksClient: createJwksRsaClient(authOptions),
  };
}

@Global()
@Module({
  providers: [
    {
      provide: AUTH_CLIENT,
      useFactory: jwksRsaClientFactory,
      inject: [API_ENVIRONMENT]
    }
  ],
  exports: [
    AUTH_CLIENT
  ]
})
export class ApiAuthModule {}
