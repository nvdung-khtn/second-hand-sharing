import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel, URL_LOGIN } from './auth.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'My-Custom-Header': 'foobar',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  login(loginData: any) {
    const body = JSON.stringify(loginData);
    return this.http.post(`https://localhost:44300/${URL_LOGIN}`, body, this.headers);
  }
}
