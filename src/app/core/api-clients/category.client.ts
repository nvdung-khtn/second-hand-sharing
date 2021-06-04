import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, URL_GET_CATEGORIES } from '../constants/category.constant';
import { PagingList, SearchRequest } from '../constants/common.constant';
import { Item } from '../constants/item.constant';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(URL_GET_CATEGORIES);
    }

    getItemByCategory(cateId: number, req: SearchRequest): Observable<PagingList<Item>> {
        const url = `${this.baseUrl}/Category/${cateId}`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<PagingList<Item>>(url, { params });
    }
}
