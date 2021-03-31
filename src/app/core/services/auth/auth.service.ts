import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoginModel,
  RegisterModel,
  URL_LOGIN,
  URL_REGISTER,
} from './auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'My-Custom-Header': 'foobar',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  login(loginData: LoginModel) {
    const body = JSON.stringify(loginData);
    return this.http.post(URL_LOGIN, body, this.headers);
  }

  register(formData: RegisterModel) {
    const body = JSON.stringify(formData);
    return this.http.post(URL_REGISTER, body, this.headers);
  }
}
