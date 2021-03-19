import { ApiEnvironment } from '@wise-guy/data';
import { sharedApiEnvironment } from './shared';

export const environment: ApiEnvironment = {
  ...sharedApiEnvironment as ApiEnvironment,
  production: false,
  CLIENT_ORIGIN: ['http://localhost:3000'],
  AUTH0_AUDIENCE: 'http://localhost:3333',
  MONGODB_URL: '******',
  MONGODB_USERNAME: '******',
  MONGODB_PASSWORD: '******',
};
