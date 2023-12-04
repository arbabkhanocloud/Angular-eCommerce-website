import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ICartItem } from '../cart/cart.model';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../cart/cart.selectors';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: ICartItem[] = [];

  shippingDetail = {
    name: '',
    address: '',
    city: '',
  };

  constructor(
    private cartService: CartService,
    private store: Store,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectCartItems).subscribe((items: ICartItem[]) => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total = total + item.quantity * item.item.price;
    }
    return total;
  }
  getTotalItems(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.quantity;
    }
    return total;
  }

  placeOrder() {
    window.alert('Your order has been placed thank you');
    this.cartService.clearCart();
    this.router.navigate(['']);
  }

  goBack() {
    this.location.back();
  }
}
