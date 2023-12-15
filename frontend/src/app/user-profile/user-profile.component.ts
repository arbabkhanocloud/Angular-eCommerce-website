import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { catchError, finalize, throwError, switchMap, tap } from 'rxjs';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userName!: string;
  userEmail!: string;
  orders: any[] = [];
  isLoading = false;
  userProfileErrorMessage = '';
  orderErrorMessage = '';
  updateSuccessMessage = '';
  updateErrorMessage = '';
  fullname = '';
  username = '';
  password = '';

  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService
      .getUserProfile()
      .pipe(
        catchError((error) => {
          this.userProfileErrorMessage =
            error.status === 0
              ? 'Could not connect to the server. Please try again later.'
              : error.error?.message ||
                'Something went wrong. Please try again.';
          return throwError(error);
        }),
        switchMap((userProfile) => {
          this.userName = userProfile.fullname;
          this.userEmail = userProfile.username;
          return this.orderService.getUserOrders();
        }),
        catchError((error) => {
          this.orderErrorMessage =
            error.status === 0
              ? 'Could not connect to the server. Please try again later.'
              : error.error?.message ||
                'Something went wrong while fetching orders. Please try again.';
          return throwError(error);
        }),
        tap((userOrders) => {
          this.orders = userOrders;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  updateUserInfo(): void {
    this.userService
      .updateUserProfile(this.fullname, this.username, this.password)
      .subscribe(
        () => {
          this.updateSuccessMessage = 'User information updated successfully.';
          this.updateErrorMessage = '';
          this.userService.getUserProfile().subscribe({
            next: (userProfile) => {
              this.userName = userProfile.fullname;
              this.userEmail = userProfile.username;
            },
            error: (error) => {
              console.error('Error fetching updated user profile:', error);
            },
          });
        },
        (error) => {
          this.updateSuccessMessage = '';
          this.updateErrorMessage =
            error.status === 0
              ? 'Could not connect to the server. Please try again later.'
              : error.error?.message ||
                'Something went wrong. Please try again.';
        },
      );
  }
}
