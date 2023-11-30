import { IProduct } from '../product/product.model';
export interface ICartState {
  isCartOpen: boolean;
  cartItems: ICartItem[];
}

export interface ICartItem {
  item: IProduct;
  quantity: number;
}
