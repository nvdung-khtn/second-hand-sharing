import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    LoginRequest,
    Login,
    RegisterRequest,
    URL_LOGIN,
    URL_REGISTER,
    URL_FORGOT_PW,
    ResetPwRequest,
    URL_RESET_PW,
} from '../constants/auth.constant';
import { Observable } from 'rxjs';
import { ResponseModel } from '../constants/common.constant';

@Injectable({
    providedIn: 'root',
})
export class AuthClient {
    constructor(private http: HttpClient) {}

    login(loginForm: LoginRequest): Observable<ResponseModel<Login>> {
        return this.http.post<ResponseModel<Login>>(URL_LOGIN, loginForm);
    }

    register(registerForm: RegisterRequest): Observable<ResponseModel<string>> {
        return this.http.post<ResponseModel<string>>(URL_REGISTER, registerForm);
    }

    sendEmail(email) {
        // const headers = new HttpHeaders({
        //   'Content-Type': 'application/json',
        // })
        return this.http.post(URL_FORGOT_PW, email);
    }

    resetPassword(resetForm: ResetPwRequest): Observable<ResponseModel<string>> {
        return this.http.post<ResponseModel<string>>(URL_RESET_PW, resetForm);
    }
}
