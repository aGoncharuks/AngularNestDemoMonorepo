import { InjectionToken } from '@angular/core';
import { AppConfig, ClientEnvironment } from './data.type';

export const CLIENT_ENVIRONMENT = new InjectionToken<ClientEnvironment>('client.environment');
export const CLIENT_CONFIG = new InjectionToken<AppConfig>('client.config');

export const API_ENVIRONMENT = 'API_ENVIRONMENT';
export const API_CONFIG = 'API_CONFIG';
export const AUTH_CLIENT = 'AUTH_CLIENT';
