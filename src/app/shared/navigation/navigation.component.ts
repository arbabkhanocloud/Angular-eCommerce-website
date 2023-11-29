import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isLogin = true;
  cartItemCount = 0;

  constructor(private readonly router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`${route}`]);
  }
}
