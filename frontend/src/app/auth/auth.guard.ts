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
  const isUserAdmin = inject(AuthService).isAdmin$.getValue();

  if (state.url.includes('cart') && !isUserAuthenticated) {
    return inject(Router).navigate(['/login']);
  } else if (
    state.url.includes('admin') &&
    (!isUserAuthenticated || !isUserAdmin)
  ) {
    return inject(Router).navigate(['/login']);
  }

  return true;
};
