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

    getJoinedGroup(): Observable<ResponseModel<Group>> {
        const url = `${this.baseUrl}/Group/joined-group`;
        return this.http.get<ResponseModel<Group>>(url);
    }

    getRoleByUserId(groupId: number, userId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/get-role?userId=${userId}`;
        return this.http.get<ResponseModel<any>>(url);
    }
}
