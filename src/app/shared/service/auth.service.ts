import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { AddressModel } from 'src/app/core/constants/address.constant';
import { UserInfo } from 'src/app/core/constants/user.constant';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(public jwtHelper: JwtHelperService) {}

    private userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    private _userInfoSubject = new BehaviorSubject<UserInfo>(this.userInfo);
    currentUser$ = this._userInfoSubject.asObservable();

    isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        // Check whether the token is expired and return
        return !this.jwtHelper.isTokenExpired(token);
    }

    getToken(): string {
        return localStorage.getItem('access_token');
    }

    getUserId() {
        return this.userInfo.id;
    }

    updateCurrentUser(user: UserInfo): void {
        this.userInfo = user;
        this._userInfoSubject.next(this.userInfo);
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }
}
