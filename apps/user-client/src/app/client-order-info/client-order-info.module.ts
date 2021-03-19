import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderResolver } from '@wise-guy/client-shared';
import { ClientOrderDetailsModule } from '../client-order-details/client-order-details.module';
import { ClientOrderInfoShellComponent } from './client-order-info-shell.component';


@NgModule({
  declarations: [ClientOrderInfoShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ClientOrderInfoShellComponent,
        resolve: {
          order: OrderResolver
        }
      }
    ]),
    ClientOrderDetailsModule
  ]
})
export class ClientOrderInfoModule { }
