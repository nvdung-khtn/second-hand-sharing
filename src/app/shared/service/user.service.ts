import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class UserService {
    constructor() { }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    getToken(): string {
        return localStorage.getItem('access_token');
    }
}
