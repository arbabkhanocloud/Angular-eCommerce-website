import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getUserOrders() {
    const userString = localStorage.getItem('currentUser');
    const user = userString ? JSON.parse(userString) : null;
    const token = user?.toke;
    console.log('token is :  ', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(
      'http://localhost:8500/api/order/userorders',
      {
        headers,
      },
    );
  }

  placeOrder() {
    console.log('object');
  }
}
