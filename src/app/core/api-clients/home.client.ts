import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagingList, ResponseModel } from './../constants/common.constant';
import {
  CreateItemRequest,
  CreateItem,
  Item,
  URL_GET_ITEMS,
  URL_POST_ITEM,
} from '../constants/item.constant';

@Injectable({
  providedIn: 'root',
})
export class HomeClient {
  constructor(private http: HttpClient) {}

  getItems(): Observable<PagingList<Item>> {
    return this.http.get<PagingList<Item>>(URL_GET_ITEMS);
  }

  createItem(item: CreateItemRequest): Observable<ResponseModel<CreateItem>> {
    return this.http.post<ResponseModel<CreateItem>>(URL_POST_ITEM, item);
  }
}
