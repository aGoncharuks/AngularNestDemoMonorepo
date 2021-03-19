import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ClientStoreOrderEffects } from './client-store-order.effects';
import { getOrderReducer, orderFeatureKey } from './client-store-order.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(orderFeatureKey, getOrderReducer),
    EffectsModule.forFeature([ClientStoreOrderEffects])
  ],
})
export class ClientStoreOrderModule {}
