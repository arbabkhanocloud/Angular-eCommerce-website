import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { finalize, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    this.isLoading = true;

    this.authService
      .signup(this.fullname, this.email, this.password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error) => {
          this.errorMessage =
            error.status === 0
              ? 'Could not connect to the server. Please try again later.'
              : error.error?.message ||
                'Something went wrong. Please try again.';
          return throwError(error);
        }),
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
