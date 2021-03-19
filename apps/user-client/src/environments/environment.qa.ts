import { ClientEnvironment } from '@wise-guy/data';
import { sharedClientEnvironment } from './shared';

export const environment: ClientEnvironment = {
  ...sharedClientEnvironment as ClientEnvironment,
  production: true,
  API_URL: '******',
  AUTH0_AUDIENCE: '******'
};
