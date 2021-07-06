import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel, SearchPostRequest, SearchRequest } from '../constants/common.constant';
import { Group, Member } from '../constants/group.constant';
import { Observable } from 'rxjs';
import { CreateItem } from '../constants/item.constant';
import { CreatePostRequest, Group_Post } from '../constants/group-post.constant';

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
}
