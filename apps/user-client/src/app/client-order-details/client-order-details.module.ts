import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientOrderDetailsComponent } from './client-order-details.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ClientOrderDetailsComponent
  ],
  exports: [
    ClientOrderDetailsComponent
  ]
})
export class ClientOrderDetailsModule {}
