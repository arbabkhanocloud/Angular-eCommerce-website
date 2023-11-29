import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import * as fromCart from '../cart/cart.reducer';
import { MaterialModule } from '../material/material/material.module';

@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
  ],
  exports: [CartComponent, CartItemComponent],
})
export class CartModule {}
