import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchRequest } from '../constants/common.constant';
import { Group, Member } from '../constants/group.constant';
import { Observable } from 'rxjs';
import { CreateItem } from '../constants/item.constant';
import { CreatePostRequest } from '../constants/group-post.constant';

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

    getAllSearchAvailableGroup(req: SearchRequest, query: string): Observable<ResponseModel<Group[]>> {
        const url = `${this.baseUrl}/Group?query=${query}`;
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
        const url = `${this.baseUrl}/Group/${groupId}/request-join`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Member[]>>(url, { params });
    }

    joinGroup(groupId: number): Observable<ResponseModel<string>> {
        const url = `${this.baseUrl}/Group/${groupId}/join`;

        return this.http.post<ResponseModel<string>>(url, groupId);
    }

    cancelJoinGroup(groupId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/join-request`;
        return this.http.delete<ResponseModel<any>>(url);
    }

    // **Member
    cancelJoin(groupId: number): Observable<ResponseModel<unknown>> {
        const url = `${this.baseUrl}/Group/${groupId}/join`;

        return this.http.post<ResponseModel<unknown>>(url, groupId);
    }

    // Member accept
    acceptInvitation(groupId: number): Observable<ResponseModel<unknown>> {
        const url = `${this.baseUrl}/Group/${groupId}/accept-invitation`;

        return this.http.put<ResponseModel<unknown>>(url, groupId);
    }

    // Member reject
    declineInvitation(groupId: number): Observable<ResponseModel<unknown>> {
        const url = `${this.baseUrl}/Group/${groupId}/decline-invitation`;

        return this.http.put<ResponseModel<unknown>>(url, groupId);
    }

    // admin
    approveToJoin(groupId: number, memberId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/join-request/${memberId}/accept`;

        return this.http.put<ResponseModel<any>>(url, { groupId, memberId });
    }

    // admin
    rejectToJoin(groupId: number, memberId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/join-request/${memberId}/reject`;

        return this.http.put<ResponseModel<any>>(url, { groupId, memberId });
    }

    kickOutMember(groupId: number, memberId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/member/${memberId}/`;

        return this.http.delete<ResponseModel<any>>(url);
    }

    promoteMember(groupId: number, memberId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/appoint-admin/${memberId}/`;

        return this.http.put<ResponseModel<any>>(url, { groupId, memberId });
    }

    getJoinStatus(groupId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/join-status`;
        return this.http.get<ResponseModel<any>>(url);
    }

    inviteMember(groupId: number, userId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/member`;
        return this.http.post<ResponseModel<any>>(url, { userId });
    }

    getGroupEvent(req: SearchRequest, groupId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/event`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<any>>(url, { params });
    }

    leaveGroup(groupId: number): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/Group/${groupId}/leave`;
        return this.http.delete<ResponseModel<any>>(url);
    }
}
