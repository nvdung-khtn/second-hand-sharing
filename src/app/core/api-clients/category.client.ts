import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, URL_GET_CATEGORIES } from '../constants/category.constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryClient {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(URL_GET_CATEGORIES);
  }
}
