import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
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
    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        this.isLoading = false;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
      },
    );
  }
}
