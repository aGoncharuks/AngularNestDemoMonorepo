import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClientNotificationsModule } from '@wise-guy/client-notifications';
import { ClientStackShellComponent } from '@wise-guy/client-shared';
import { ClientOrderDetailsModule } from '../client-order-details/client-order-details.module';
import { ClientStackOrderListComponent } from './client-stack-order-list/client-stack-order-list.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ClientStackShellComponent}
    ]),
    ClientNotificationsModule,
    ClientOrderDetailsModule
  ],
  declarations: [
    ClientStackShellComponent,
    ClientStackOrderListComponent
  ],
})
export class ClientStackModule {}
