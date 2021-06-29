import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-detail-group',
    templateUrl: './detail-group.component.html',
    styleUrls: ['./detail-group.component.scss', '../../../../../styles/_button.scss'],
})
export class DetailGroupComponent implements OnInit {
    tabContext = [
        {
            id: 1,
            name: 'Giới thiệu',
        },
        {
            id: 2,
            name: 'Bài viết',
        },
        {
            id: 3,
            name: 'Thành viên',
        },
    ];

    selectedTab = 3;
    groupId: number;
    isMember = false;
    myRole = '';
    groupDetail: any;
    openInviteModal = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupClient: GroupClient
    ) {}

    ngOnInit(): void {
        this.groupId = Number(this.route.snapshot.paramMap.get('id'));
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.getMyRole(this.groupId, user?.id);
        this.getGroupInfo(this.groupId);
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                this.myRole = response.message;
                if (this.myRole !== '' && this.myRole !== 'member') {
                    this.isMember = true;
                }
                /* if (this.myRole !== '') {
                    this.selectedTab = 2;
                } else { this.selectedTab = 1; } */
            },
            (error) => {
                console.log(error);
            }
        );
    };

    getGroupInfo = (groupId: number) => {
        // call api get group detail
        this.groupDetail = {
            id: 1,
            groupName: 'test 2',
            description: 'string',
            createDate: '2021-05-20T15:02:03.842292',
            rules: '12',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/4ad9e526-64d9-4942-a8ff-8aa2ac12d1a9',
        };
    };

    onSelectTab = (id: number) => {
        this.selectedTab = id;
    };

    selectFile(event: any): void {
        const image: FileList = event.target.files;
        if (image) {
            // api update group avatar
        }
    }

    onInvite = () => {
        this.openInviteModal = true;
    };

    onClickJoin = () => {
        // gọi api join group
        console.log('click join');
    }
}
