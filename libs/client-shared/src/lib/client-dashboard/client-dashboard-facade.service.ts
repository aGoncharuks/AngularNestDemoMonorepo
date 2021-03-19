import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CLIENT_ENVIRONMENT, ClientEnvironment, Order } from '@wise-guy/data';
import { pick } from 'ramda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDashboardFacadeService {

  constructor(private http: HttpClient,
              @Inject(CLIENT_ENVIRONMENT) private environment: ClientEnvironment) { }

  public getAllOrders$(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.environment.API_URL}/order/all`
    )
  }

  public deleteOrder(order: Order): Observable<Order[]> {
    return this.http.post<Order[]>(
      `${this.environment.API_URL}/order/delete`,
      pick<Order, string>(['_id', 'type'], order)
    )
  }
}
