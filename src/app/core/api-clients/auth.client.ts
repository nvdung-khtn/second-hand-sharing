import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginModel,
  RegisterModel,
  URL_LOGIN,
  URL_REGISTER,
} from '../constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private http: HttpClient) {}

  login(loginData: LoginModel) {
    const body = JSON.stringify(loginData);
    return this.http.post(URL_LOGIN, body);
  }

  register(formData: RegisterModel) {
    const body = JSON.stringify(formData);
    return this.http.post(URL_REGISTER, body);
  }
}
