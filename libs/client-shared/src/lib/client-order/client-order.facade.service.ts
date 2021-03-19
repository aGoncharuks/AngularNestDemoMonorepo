import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, CLIENT_CONFIG, CLIENT_ENVIRONMENT, ClientEnvironment, GenericResponse, Order } from '@wise-guy/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { complementByDefaultImages } from './client-order.function';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderFacadeService {

  constructor(private http: HttpClient,
              @Inject(CLIENT_ENVIRONMENT) private environment: ClientEnvironment,
              @Inject(CLIENT_CONFIG) private config: AppConfig) { }

  newOrder$(order: Order): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.environment.API_URL}/order/new`,
      order
    )
  }

  replaceOrder$(order: Order): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(
      `${this.environment.API_URL}/order/replace`,
      order
    )
  }

  getAll$(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.environment.API_URL}/order/all`).pipe(
       map(orders => complementByDefaultImages(orders, this.config))
    )
  }

  getStack$(payload: {userId: string}): Observable<Order[]> {
    return this.http.post<Order[]>(
      `${this.environment.API_URL}/stack/matches`,
      payload
    ).pipe(
       map(orders => complementByDefaultImages(orders, this.config))
    )
  };
}
