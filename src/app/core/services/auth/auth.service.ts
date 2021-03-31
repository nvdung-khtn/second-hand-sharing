import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel, URL_LOGIN } from './auth.constant';
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = `${environment.apiUrl}/${URL_LOGIN}`;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'My-Custom-Header': 'foobar',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) { }

  login(loginData: LoginModel) {
    const body = JSON.stringify(loginData);
    return this.http.post(this.URL, body, this.headers);
  }
}
