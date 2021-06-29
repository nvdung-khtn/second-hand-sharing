import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchRequest } from '../constants/common.constant';
import { Group, Member } from '../constants/group.constant';
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

    getAllJoinedGroup(req: SearchRequest): Observable<ResponseModel<Group[]>> {
        const url = `${this.baseUrl}/Group/joined-group`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }

    getRoleByUserId(groupId: number, userId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/get-role`;
        const params = {
            userId: `${userId}`,
        };

        return this.http.get<ResponseModel<any>>(url, { params });
    }

    getAllAvailableGroup(req: SearchRequest): Observable<ResponseModel<Group[]>> {
        const url = `${this.baseUrl}/Group`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Group[]>>(url, { params });
    }

    getGroupDetailById(groupId: number): Observable<ResponseModel<Group>> {
        const url = `${this.baseUrl}/Group/${groupId}`;
        return this.http.get<ResponseModel<Group>>(url);
    }

    getAllMemberByGroupId(
        req: SearchRequest,
        groupId: number
    ): Observable<ResponseModel<Member[]>> {
        const url = `${this.baseUrl}/Group/${groupId}/member`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Member[]>>(url, { params });
    }

    getAllAdminByGroupId(req: SearchRequest, groupId: number): Observable<ResponseModel<Member[]>> {
        const url = `${this.baseUrl}/Group/${groupId}/admin`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Member[]>>(url, { params });
    }

    getAllRequestJoin(req: SearchRequest, groupId: number): Observable<ResponseModel<Member[]>> {
        const url = `${this.baseUrl}/Group/${groupId}/admin`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Member[]>>(url, { params });
    }
}
