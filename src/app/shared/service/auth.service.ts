import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getCurrentName() {
    return JSON.parse(localStorage.getItem('userInfo')).fullName;
  }
  
}
