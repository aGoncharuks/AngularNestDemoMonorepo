import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ADMIN_CLIENT_ROUTES } from '../admin-client.routes';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      ADMIN_CLIENT_ROUTES,
      { initialNavigation: 'enabled' }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ]
})
export class AppModule {}
