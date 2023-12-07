import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}
  onSubmit() {
    this.isLoading = true;
    // Simulating an asynchronous signup process
    setTimeout(() => {
      // Assuming signup is successful
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 2000);
  }
}
