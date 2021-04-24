import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagingList } from './../constants/common.constant';
import { Item, URL_GET_ITEMS } from '../constants/item.constant';


@Injectable({
  providedIn: 'root',
})
export class HomeClient {
  constructor(private http: HttpClient) {}

  getItems(): Observable<PagingList<Item>> {
    return this.http.get<PagingList<Item>>(URL_GET_ITEMS);
  }
}
