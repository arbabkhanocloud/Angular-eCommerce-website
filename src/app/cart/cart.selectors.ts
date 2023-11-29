import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartState } from './cart.model';

export const selectCartState = createFeatureSelector<ICartState>('cart');

export const selectIsCartOpen = createSelector(
  selectCartState,
  (state: ICartState) => state.isCartOpen,
);

export const selectCartItems = createSelector(
  selectCartState,
  (state: ICartState) => state.cartItems,
);
