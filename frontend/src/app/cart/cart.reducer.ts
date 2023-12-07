import { createReducer, on, Action } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { ICartState } from './cart.model';

export const initialState: ICartState = {
  isCartOpen: false,
  cartItems: [],
};

export const CART_FEATURE_KEY = 'cart';

export const cartReducer = createReducer(
  initialState,
  on(
    CartActions.setIsCartOpen,
    (state, { isOpen }): ICartState => ({
      ...state,
      isCartOpen: isOpen,
    }),
  ),
  on(CartActions.addItemToCart, (state, { item }) => {
    const existingCartItem = state.cartItems.find(
      (ci) => ci.item.id === item.id,
    );

    if (existingCartItem) {
      const updatedCartItems = state.cartItems.map((ci) =>
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    } else {
      const newCartItem = { item, quantity: 1 };
      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
      };
    }
  }),
  on(CartActions.removeItemFromCart, (state, { item }) => {
    const existingCartItem = state.cartItems.find(
      (ci) => ci.item.id === item.id,
    );

    if (existingCartItem && existingCartItem.quantity > 1) {
      const updatedCartItems = state.cartItems.map((ci) =>
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci,
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    } else {
      const updatedCartItems = state.cartItems.filter(
        (ci) => ci.item.id !== item.id,
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }
  }),
  on(CartActions.deleteItemFromCart, (state, { item }) => ({
    ...state,
    cartItems: state.cartItems.filter((ci) => ci.item.id !== item.id),
  })),
  on(
    CartActions.clearCart,
    (state: ICartState): ICartState => ({
      ...state,
      cartItems: [],
    }),
  ),
);

export function reducer(state: ICartState | undefined, action: Action) {
  return cartReducer(state, action);
}
