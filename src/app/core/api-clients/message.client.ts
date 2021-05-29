import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  MessageConstant,
  RequestSendMessage,
  ResponseSendMessage,
} from '../constants/message.constant';

@Injectable({
  providedIn: 'root',
})
export class MessageClient {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  getMessageByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Observable<MessageConstant> {
    const url = `${this.baseUrl}/Message/${userId}?PageNumber=${page}&PageSize=${pageSize}`;
    return this.http.get<MessageConstant>(url);
  }

  getRecentMessage(
    page: number,
    pageSize: number
  ): Observable<MessageConstant> {
    const url = `${this.baseUrl}/Message/recent-messages?PageNumber=${page}&PageSize=${pageSize}`;
    return this.http.get<MessageConstant>(url);
  }

  sendMessage(
    sendMessageForm: RequestSendMessage
  ): Observable<ResponseSendMessage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const url = `${this.baseUrl}/Message`;
    return this.http.post<ResponseSendMessage>(url, sendMessageForm, { headers });
  }
}
