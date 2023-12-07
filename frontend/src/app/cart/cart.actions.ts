// store/cart.actions.ts

import { createAction, props } from '@ngrx/store';
import { IProduct } from '../product/product.model';

export const setIsCartOpen = createAction(
  '[Cart] Set Is Cart Open',
  props<{ isOpen: boolean }>(),
);
export const addItemToCart = createAction(
  '[Cart] Add Item',
  props<{ item: IProduct }>(),
);
export const removeItemFromCart = createAction(
  '[Cart] Remove Item',
  props<{ item: IProduct }>(),
);
export const deleteItemFromCart = createAction(
  '[Cart] Delete Item',
  props<{ item: IProduct }>(),
);

export const clearCart = createAction('[Cart] Clear Cart');
