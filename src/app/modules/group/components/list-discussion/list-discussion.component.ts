import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupPostClient } from 'src/app/core/api-clients/group-post.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';

@Component({
    selector: 'app-list-discussion',
    templateUrl: './list-discussion.component.html',
    styleUrls: ['./list-discussion.component.scss'],
})
export class ListDiscussionComponent implements OnInit {
    // group
    groupId = -1;
    defaultReq: SearchRequest;

    listDiscussion = [];

    constructor(private route: ActivatedRoute, private groupPostClient: GroupPostClient) {
        this.defaultReq = new SearchRequest(1, 200);
    }

    ngOnInit(): void {
        this.groupId = Number(this.route.snapshot.paramMap.get('id'));
        this.groupPostClient.getGroupPost(this.defaultReq, this.groupId).subscribe((response) => {
            this.listDiscussion = response?.data;
        })
    }
}
