import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { GroupPostClient } from 'src/app/core/api-clients/group-post.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';

@Component({
    selector: 'app-detail-discussion',
    templateUrl: './detail-discussion.component.html',
    styleUrls: ['./detail-discussion.component.scss'],
})
export class DetailDiscussionComponent implements OnInit {
    groupId: number;
    myRole = '';
    myAvatar = '';

    // discussion
    discussionId;
    detailPost: any;
    commentOnPost: any;
    myInput = '';

    defaultReq: SearchRequest;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private groupClient: GroupClient,
        private groupPostClient: GroupPostClient
    ) {
        this.defaultReq = new SearchRequest(1, 200);
    }

    ngOnInit(): void {
        // gọi api get detail group post. Nhớ handle nếu error thì chuyển nó sang page not found
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
        this.discussionId = Number(this.route.snapshot.paramMap.get('discussionId'));
        this.getMyRole(this.groupId, user?.id);
        this.myAvatar = user?.avatarUrl;

        this.groupPostClient.getDetailGroupPost(this.discussionId).subscribe(
            (response) => {
                this.detailPost = response.data;
            },
            (error) => {
                this.router.navigateByUrl(`/group/${this.groupId}`);
            }
        );
        this.groupPostClient.getCommentByPostId(this.defaultReq, this.discussionId).subscribe(
            (response) => {
                this.commentOnPost = response?.data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                if (response.succeeded) {
                    this.myRole = response.message;
                }
            },
            (error) => {
                this.router.navigateByUrl(`/group/${this.groupId}`);
            }
        );
    };

    onClose = () => {
        /* const history: any = this.location.getState();
        if (history.navigationId > 1) {
            this.location.back();
        } else {
            this.router.navigateByUrl(`/home`);
        } */
        this.location.back();
    };

    onSend = () => {
        const sendCommentForm = {
            content: this.myInput,
        };
        this.groupPostClient.sendComment(sendCommentForm, this.discussionId).subscribe(
            (response) => {
                this.groupPostClient.getCommentByPostId(this.defaultReq, this.discussionId).subscribe(
                    (response) => {
                        this.commentOnPost = response?.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                this.myInput = '';
            },
            (error) => console.log(error)
        );
    };
}
