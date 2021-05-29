import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagingList, ResponseModel } from './../constants/common.constant';
import {
  CreateItemRequest,
  CreateItem,
  Item,
} from '../constants/item.constant';
import { environment } from 'src/environments/environment';
import { ReceiveRequest } from '../constants/receive-request.constant';

@Injectable({
  providedIn: 'root',
})
export class HomeClient {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  getItems(): Observable<PagingList<Item>> {
    const url = `${this.baseUrl}/Item?PageNumber=1&PageSize=100`;
    return this.http.get<PagingList<Item>>(url);
  }

  createItem(item: CreateItemRequest): Observable<ResponseModel<CreateItem>> {
    const url = `${this.baseUrl}/Item`;
    return this.http.post<ResponseModel<CreateItem>>(url, item);
  }

  getItemById(itemId: string): Observable<ResponseModel<Item>> {
    const url = `${this.baseUrl}/Item/${itemId}`;
    return this.http.get<ResponseModel<Item>>(url);
  }

  getAllReceiveRequest(itemId): Observable<ResponseModel<ReceiveRequest[]>> {
    const url = `${this.baseUrl}/Item/${itemId}/receive-request`;
    return this.http.get<ResponseModel<ReceiveRequest[]>>(url);
  }
}
