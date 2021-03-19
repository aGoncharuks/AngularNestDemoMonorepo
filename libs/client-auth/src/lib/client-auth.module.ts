import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientAuthInterceptor } from './client-auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ClientAuthInterceptor,
    multi: true
  }]
})
export class ClientAuthModule {}
