import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRequest,
  Login,
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

  login(loginForm: LoginRequest): Observable<ResponseModel<Login>> {
    return this.http.post<ResponseModel<Login>>(URL_LOGIN, loginForm);
  }

  register(registerForm: RegisterRequest): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(URL_REGISTER, registerForm);
  }
}
