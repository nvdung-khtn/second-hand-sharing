import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category, URL_GET_CATEGORIES } from '../constants/category.constant';
import { PagingList, SearchRequest } from '../constants/common.constant';
import { environment } from 'src/environments/environment';
import { Notification } from '../constants/notification.constant';

@Injectable({
    providedIn: 'root',
})
export class NotificationClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    getNotifications(req: SearchRequest): Observable<PagingList<Notification>> {
        const url = `${this.baseUrl}/Notification`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<PagingList<Notification>>(url, { params });
    }
}
