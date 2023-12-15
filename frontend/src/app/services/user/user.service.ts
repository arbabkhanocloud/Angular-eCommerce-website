import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserProfile() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser: any = currentUserString
      ? JSON.parse(currentUserString)
      : null;
    const token = currentUser?.toke;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>('http://localhost:8500/api/users/profile', {
      headers,
    });
  }

  updateUserProfile(fullname: string, username: string, password: string) {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser: any = currentUserString
      ? JSON.parse(currentUserString)
      : null;
    const token = currentUser?.toke;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { fullname, username, password };
    return this.httpClient.post<any>(
      'http://localhost:8500/api/users/profile',
      body,
      {
        headers,
      },
    );
  }
}
