import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ClientAuthModule } from '@wise-guy/client-auth';
import { ClientStoreOrderModule } from '@wise-guy/client-shared';
import { APP_CONFIG_RE } from '@wise-guy/config';
import { CLIENT_CONFIG, CLIENT_ENVIRONMENT } from '@wise-guy/data';
import { USER_CLIENT_ROUTES } from '../user-client.routes';
import { environment } from '../environments/environment';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppRootComponent } from './app-root/app-root.component';

const MATERIAL_MODULES = [
  MatTabsModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    ClientAuthModule,
    FormlyModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      USER_CLIENT_ROUTES,
      { initialNavigation: 'enabled' }
    ),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    ClientStoreOrderModule
  ],
  providers: [
    {
      provide: CLIENT_ENVIRONMENT,
      useValue: environment
    },
    {
      provide: CLIENT_CONFIG,
      useValue: APP_CONFIG_RE
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      }
    },
  ],
  declarations: [
    AppRootComponent,
    AppHeaderComponent
  ],
  exports: [
    AppRootComponent,
    AppHeaderComponent
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {

}
