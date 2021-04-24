import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  URL_LOGIN,
  URL_REGISTER,
} from '../constants/auth.constant';
import { Observable } from 'rxjs';
import { ResponseModel } from '../constants/common.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginRequest): Observable<ResponseModel<LoginResponse>> {
    return this.http.post<ResponseModel<LoginResponse>>(URL_LOGIN, loginForm);
  }

  register(registerForm: RegisterRequest): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(URL_REGISTER, registerForm);
  }
}
