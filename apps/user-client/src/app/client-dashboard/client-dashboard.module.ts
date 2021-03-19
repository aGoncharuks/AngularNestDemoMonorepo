import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ClientDashboardShellComponent } from '@wise-guy/client-shared';
import { ClientDashboardOrderListComponent } from './client-dashboard-order-list/client-dashboard-order-list.component';

const MATERIAL_MODULES = [
  MatListModule,
  MatIconModule
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ClientDashboardShellComponent}
    ]),
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule
  ],
  declarations: [
    ClientDashboardShellComponent,
    ClientDashboardOrderListComponent
  ],
})
export class ClientDashboardModule {}
