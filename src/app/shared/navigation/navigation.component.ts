import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCartItems } from 'src/app/cart/cart.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLogin = true;
  cartItemCount!: number;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectCartItems).subscribe((cartItems) => {
      this.cartItemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
