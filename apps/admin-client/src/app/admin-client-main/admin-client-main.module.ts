import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminClientMainComponent } from './admin-client-main.component';


@NgModule({
  declarations: [AdminClientMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AdminClientMainComponent}
    ])
  ]
})
export class AdminClientMainModule { }
