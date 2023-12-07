import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/product/product.model';
import { ICartItem } from '../cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: ICartItem;

  constructor(private cartService: CartService) {}

  getItemPrice(): number {
    let total = 0;
    total = this.cartItem.quantity * this.cartItem.item.price;
    return total;
  }

  decrementItem(item: IProduct) {
    this.cartService.removeItemFromCart(item);
  }
  incrementItem(item: IProduct) {
    this.cartService.addItemToCart(item);
  }
  deleteItem(item: IProduct) {
    this.cartService.deleteItemFromCart(item);
  }
}
