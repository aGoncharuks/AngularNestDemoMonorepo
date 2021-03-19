import { FormlyFieldConfig } from '@ngx-formly/core';
import { JwksClient } from 'jwks-rsa';
import { FilterQuery } from 'mongodb';

export interface AuthOptions {
  audience: string,
  issuer: string,
  algorithms: string[],
  namespace: string,
  emailClaimName: string
}

export interface User {
  email: string;
}

export interface SharedEnvironment {
  production: boolean,
  AUTH0_DOMAIN: string,
  AUTH0_CLIENT_ID: string,
  AUTH0_AUDIENCE: string,
  VAPID_PUBLIC_KEY: string
}

export interface ClientEnvironment extends SharedEnvironment {
  API_URL: string
}

export interface ApiEnvironment extends SharedEnvironment {
  CLIENT_ORIGIN: string[],
  AUTH0_NAMESPACE: string,
  AUTH0_EMAIL_CLAIM_NAME: string,
  VAPID_PRIVATE_KEY: string,
  EMAIL: string;
  MONGODB_URL;
  MONGODB_USERNAME;
  MONGODB_PASSWORD;
  MONGODB_DBNAME;
}

export enum OrderPriority {
  FIRST = 1,
  SECOND = 2
}

export interface CustomFieldConfig {
  priority: OrderPriority,
  matchQueryFactory: (order: Order) => FilterQuery<Order>;
  fixedConditionFactory?: (order: Order) => boolean;
  combined?: boolean
}

export type FieldConfig = FormlyFieldConfig & CustomFieldConfig;

export interface AppConfig {
  pages: PageConfig[],
  orderFields: FieldConfig[],
  displayNameField: string;
  newOrderNotificationFactory: (order: Order) => {notification: Partial<Notification>}
  displayNameMap?: {[key: string]: string},
  imagePlaceholders?: {[key: string]: string},
}

export enum AppPageRoute {
 STACK = 'stack',
 DASHBOARD = 'dashboard',
 ORDER_FORM = 'order-form',
 ORDER_INFO = 'order-info'
}

export enum AdminAppPageRoute {
 MAIN = 'main',
 PUSH_FORM = 'push-form'
}

export interface PageConfig {
  route: AppPageRoute,
  nameText: string,
  show: boolean,
  texts?: {[key: string]: string}
}

export interface Buyer {
  name: string
}

export interface Seller {
  name: string
}

export enum GenericResponseStatus {
  OK = 'OK',
  ERROR = 'ERROR'
}

export interface GenericResponse {
  status: GenericResponseStatus,
  error?: string
}

export interface ApiAuthClient {
  jwksClient: JwksClient,
  authOptions: AuthOptions
}

export enum OrderType {
  BID = 'bid',
  OFFER = 'offer'
}

export enum DBCollection  {
  USER = 'user',
  BID = 'bid',
  OFFER = 'offer'
}

export type AnyObject = any;

export interface Order {
  type: OrderType,
  subType?: string,
  _id?: string,
  matchFor?: Array<{_id: string, displayName: string}>,
  images?: string[],
  userId?: string,
  [key: string]: unknown
}

