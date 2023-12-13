import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { finalize } from 'rxjs';
import { MatCardLgImage } from '@angular/material/card';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.authService
      .login(this.username, this.password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessage = error.error?.message;
        },
      );
  }
}
