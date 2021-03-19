import { ApiEnvironment } from '@wise-guy/data';

export const sharedApiEnvironment: Partial<ApiEnvironment> = {
  production: false,
  AUTH0_DOMAIN: '******',
  AUTH0_CLIENT_ID: '******',
  AUTH0_NAMESPACE: '******',
  AUTH0_EMAIL_CLAIM_NAME: 'email',
  VAPID_PRIVATE_KEY: '******',
  VAPID_PUBLIC_KEY: '******',
  EMAIL: '******',
  MONGODB_DBNAME: '******'
};
