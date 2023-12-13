import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from 'src/app/cart/cart.selectors';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {  Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isUserAuthenticated$!:Observable<boolean>;
  isUserAuthenticatedAdmin$!:Observable<boolean>;
  cartItemCount!: number;
  showSearchBar = true;
  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly authService:AuthService
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated$=this.authService.isUserAuthenticated();
    this.isUserAuthenticatedAdmin$=this.authService.isUserAdmin();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        const currentRoute = event.url;
        if (currentRoute === '/cart' || currentRoute === '/checkout') {
          this.showSearchBar = false;
        } else {
          this.showSearchBar = true;
        }
      });

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
  logout(){
    this.authService.logout();
  }
}
