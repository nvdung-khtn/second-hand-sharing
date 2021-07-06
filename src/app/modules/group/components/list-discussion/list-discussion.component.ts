import { SearchPostRequest } from './../../../../core/constants/common.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupPostClient } from 'src/app/core/api-clients/group-post.client';
import { Group_Post } from 'src/app/core/constants/group-post.constant';

@Component({
    selector: 'app-list-discussion',
    templateUrl: './list-discussion.component.html',
    styleUrls: ['./list-discussion.component.scss'],
})
export class ListDiscussionComponent implements OnInit {
    // group
    groupId = -1;

    listDiscussion: Group_Post[] = [];

    constructor(private route: ActivatedRoute, private groupPostClient: GroupPostClient) {}

    ngOnInit(): void {
        this.groupId = Number(this.route.snapshot.paramMap.get('id'));
        this.groupPostClient
            .getAllPost(new SearchPostRequest(this.groupId, 1, 100))
            .subscribe((response) => {
                this.listDiscussion = response.data;
            });
    }
}
