import { ApiEnvironment } from '@wise-guy/data';
import { sharedApiEnvironment } from './shared';

export const environment: ApiEnvironment = {
  ...sharedApiEnvironment as ApiEnvironment,
  production: true,
  CLIENT_ORIGIN: ['******', '******'],
  AUTH0_AUDIENCE: '******',
  MONGODB_URL: '******',
  MONGODB_USERNAME: '******',
  MONGODB_PASSWORD: '******',
};
