import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isUserAuthenticated = inject(AuthService).isAuthenticated$.getValue();
  // const isUserAdmin = inject(AuthService).isAdmin$.getValue();
  // const categoryType = route.paramMap.get('categoryType');

  if (state.url === '/user-profile' && !isUserAuthenticated) {
    return inject(Router).navigate(['/login']);
  }
  // if (state.url === '/cart' && (!isUserAuthenticated || !isUserAdmin)) {
  //   return inject(Router).navigate(['']);
  // }
  // if (state.url.includes('cart') && (!isUserAuthenticated || !isUserAdmin)) {
  //   return inject(Router).navigate(['/login']);
  // }
  // if (categoryType && !isUserAuthenticated) {
  //   return inject(Router).navigate(['/login']);
  // }

  return true;
};
