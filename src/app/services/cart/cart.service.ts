import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CartActions from '../../cart/cart.actions';
import { IProduct } from 'src/app/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly store: Store) {}

  setIsCartOpen(open: boolean): void {
    this.store.dispatch(CartActions.setIsCartOpen({ isOpen: open }));
  }
  addItemToCart(item: IProduct) {
    this.store.dispatch(CartActions.addItemToCart({ item }));
  }

  removeItemFromCart(item: IProduct) {
    this.store.dispatch(CartActions.removeItemFromCart({ item }));
  }

  deleteItemFromCart(item: IProduct) {
    this.store.dispatch(CartActions.deleteItemFromCart({ item }));
  }
}
