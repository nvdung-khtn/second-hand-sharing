import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../constants/common.constant';
import { Group } from '../constants/group.constant';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GroupClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    createGroup(formData: Group): Observable<ResponseModel<Group>> {
        const url = `${this.baseUrl}/Group`;
        return this.http.post<ResponseModel<Group>>(url, formData);
    }
}