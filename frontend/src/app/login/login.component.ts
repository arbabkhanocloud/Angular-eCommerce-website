import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private readonly router: Router) {}

  onSubmit() {
    this.isLoading = true;
    // Simulating an asynchronous signIn process
    setTimeout(() => {
      // Assuming login is successful
      this.isLoading = false;
      this.router.navigate(['']);
    }, 2000);
    this.errorMessage = '';
  }
}
