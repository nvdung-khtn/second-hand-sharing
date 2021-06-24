import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {}
    private userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        // Check whether the token is expired and return
        return !this.jwtHelper.isTokenExpired(token);
    }

    getToken(): string {
        return localStorage.getItem('access_token');
    }

    getCurrentName() {
        return this.userInfo.fullName;
    }

    getUserId() {
        return this.userInfo.id;
    }

    getCurrentUser() {
        return this.userInfo;
    }
}
