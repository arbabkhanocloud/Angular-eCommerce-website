/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from './cart.selectors';
import { ICartItem } from './cart.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly location: Location,
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  checkout() {
    this.router.navigate(['checkout']);
  }
  goBack() {
    this.location.back();
  }
}
