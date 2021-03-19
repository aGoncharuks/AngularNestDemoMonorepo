import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminClientPushFormComponent } from './admin-client-push-form.component';


@NgModule({
  declarations: [AdminClientPushFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: AdminClientPushFormComponent}
    ])
  ]
})
export class AdminClientPushFormModule { }
