import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../constants/common.constant';
import { Group } from '../constants/group.constant';
import { Observable } from 'rxjs';
import { Item } from '../constants/item.constant';

@Injectable({
    providedIn: 'root',
})
export class ItemClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    getMyDonations(userId: number): Observable<ResponseModel<Item[]>> {
        const url = `${this.baseUrl}/Item/${userId}/donations`;
        return this.http.get<ResponseModel<Item[]>>(url);
    }

    getMyRegistration(userId: number): Observable<ResponseModel<Item[]>> {
        console.log(userId)
        const url = `${this.baseUrl}/ReceiveItem/${userId}/requests`;
        return this.http.get<ResponseModel<Item[]>>(url);
    }
}
