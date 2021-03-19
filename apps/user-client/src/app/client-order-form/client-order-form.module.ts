import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { ClientOrderShellComponent } from '@wise-guy/client-shared';
import { ClientOrderFormComponent } from './client-order-form/client-order-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ClientOrderShellComponent }
    ]),
    ReactiveFormsModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    FormlyMatSliderModule,
    MatButtonModule
  ],
  declarations: [ClientOrderShellComponent, ClientOrderFormComponent],
})
export class ClientOrderFormModule {}
