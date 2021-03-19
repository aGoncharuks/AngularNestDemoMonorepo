import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { CLIENT_ENVIRONMENT, ClientEnvironment } from '@wise-guy/data';

@Injectable({
  providedIn: 'root'
})
export class ClientNotificationsService {
  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    @Inject(CLIENT_ENVIRONMENT) private environment: ClientEnvironment
  ) {
  }

  trySubscribeToNotifications(): void {
    this.swPush.requestSubscription({
      serverPublicKey: this.environment.VAPID_PUBLIC_KEY
    })
      .then(subscription => this.registerSubscription(subscription))
      .catch(error => console.error('Could not subscribe to notifications: ', error));
  }

  private registerSubscription(subscription: PushSubscription): void {
    this.http.post(`${this.environment.API_URL}/notification/register-subscription`, subscription)
      .subscribe();
  }
}
