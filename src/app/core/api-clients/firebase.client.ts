import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseClient {

  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  registerFirebase(
    token: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const url = `${this.baseUrl}/FirebaseToken`;
    return this.http.post<any>(url, { firebaseToken: token }, {headers});
  }
}
