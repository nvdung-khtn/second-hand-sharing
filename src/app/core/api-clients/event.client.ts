import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchRequest } from '../constants/common.constant';
import { Observable } from 'rxjs';
import { Item } from '../constants/item.constant';
import { Group } from '../constants/group.constant';
import { CreateEvent, EventType } from '../constants/event.constant';

@Injectable({
    providedIn: 'root',
})
export class EventClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    createEvent(eventForm: CreateEvent): Observable<ResponseModel<EventType>> {
        const url = `${this.baseUrl}/Event`;

        return this.http.post<ResponseModel<EventType>>(url, eventForm);
    }

    getAllAvailableEvent(req: SearchRequest): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }

    getSearchAllAvailableEvent(req: SearchRequest, query: string): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event?query=${query}`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }

    getEventById(eventId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}`;
        return this.http.get<ResponseModel<Group[]>>(url);
    }

    getAllItemsInEvent(req: SearchRequest, eventId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}/Item`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }

    acceptItem(eventId: number, itemId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}/accept-item/${itemId}`;
        return this.http.put<ResponseModel<any>>(url, { eventId, itemId });
    }

    cancelAcceptItem(eventId: number, itemId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}/cancel-accept/${itemId}`;
        return this.http.put<ResponseModel<any>>(url, { eventId, itemId });
    }

    rejectItem(eventId: number, itemId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}/reject-item/${itemId}/`;
        return this.http.delete<ResponseModel<any>>(url);
    }

    getMyDonations(req: SearchRequest, eventId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Event/${eventId}/my-donations`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }
}
