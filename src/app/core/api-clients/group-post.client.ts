import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchRequest } from '../constants/common.constant';
import { Group, GroupPost } from '../constants/group.constant';
import { Observable } from 'rxjs';
import { Item } from '../constants/item.constant';
import { RequestSendComment, ResponseSendComment } from '../constants/group-post.constant';

@Injectable({
    providedIn: 'root',
})
export class GroupPostClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    getGroupPost(req: SearchRequest, groupId: number): Observable<ResponseModel<GroupPost[]>> {
        const url = `${this.baseUrl}/GroupPost?GroupId=${groupId}`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<GroupPost[]>>(url, { params });
    }

    getDetailGroupPost(postId: number): Observable<ResponseModel<GroupPost[]>> {
        const url = `${this.baseUrl}/GroupPost/${postId}`;
        return this.http.get<ResponseModel<GroupPost[]>>(url);
    }

    getCommentByPostId(req: SearchRequest, postId: number): Observable<ResponseModel<GroupPost[]>> {
        const url = `${this.baseUrl}/GroupPost/${postId}/comment`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<GroupPost[]>>(url, { params });
    }

    sendComment(
        sendCommentForm: RequestSendComment,
        postId: number
      ): Observable<ResponseSendComment> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        const url = `${this.baseUrl}/GroupPost/${postId}/comment`;
        return this.http.post<ResponseSendComment>(url, sendCommentForm, { headers });
      }
}
