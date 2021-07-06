import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchPostRequest, SearchRequest } from '../constants/common.constant';
import { Observable } from 'rxjs';
import { CreateItem } from '../constants/item.constant';
import { CreatePostRequest, Group_Post } from '../constants/group-post.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../constants/item.constant';
import { RequestSendComment, ResponseSendComment } from '../constants/group-post.constant';

@Injectable({
    providedIn: 'root',
})
export class GroupPostClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    // Post bai
    createPost(postData: CreatePostRequest): Observable<ResponseModel<CreateItem>> {
        const url = `${this.baseUrl}/GroupPost`;

        return this.http.post<ResponseModel<CreateItem>>(url, postData);
    }

    // Get Post
    getAllPost(req: SearchPostRequest): Observable<ResponseModel<Group_Post[]>> {
        const url = `${this.baseUrl}/GroupPost`;
        const params = {
            GroupId: `${req.groupId}`,
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };

        return this.http.get<ResponseModel<Group_Post[]>>(url, { params });
    }

    getDetailGroupPost(postId: number): Observable<ResponseModel<Group_Post[]>> {
        const url = `${this.baseUrl}/GroupPost/${postId}`;
        return this.http.get<ResponseModel<Group_Post[]>>(url);
    }

    getCommentByPostId(req: SearchRequest, postId: number): Observable<ResponseModel<Group_Post[]>> {
        const url = `${this.baseUrl}/GroupPost/${postId}/comment`;
        const params = {
            PageNumber: `${req.pageNumber}`,
            PageSize: `${req.pageSize}`,
        };
        return this.http.get<ResponseModel<Group_Post[]>>(url, { params });
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
