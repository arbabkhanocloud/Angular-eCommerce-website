import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.isAuthenticated$.next(true);
      this.isAdmin$.next(user.isAdmin);
    }
  }

  isUserAuthenticated = () => {
    return this.isAuthenticated$.asObservable();
  };

  isUserAdmin = () => {
    return this.isAdmin$.asObservable();
  };

  login(username: string, password: string) {
    return this.httpClient
      .post(`http://localhost:8500/api/users/login`, {
        username,
        password,
      })
      .pipe(
        switchMap((user: any) => {
          this.isAuthenticated$.next(true);
          this.isAdmin$.next(user.isAdmin);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return of(user);
        }),
      );
  }

  signup(fullname: string, email: string, password: string) {
    console.log('object');
    return this.httpClient
      .post(`http://localhost:8500/api/users/signup`, {
        fullname: fullname,
        username: email,
        password: password,
      })
      .pipe(
        switchMap((user: any) => {
          this.isAuthenticated$.next(true);
          this.isAdmin$.next(user.isAdmin);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return of(user);
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}
