import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingShellComponent } from './landing-shell/landing-shell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LandingShellComponent }
    ])
  ],
  declarations: [LandingShellComponent],
  exports: [LandingShellComponent]
})
export class ClientLandingModule {}
