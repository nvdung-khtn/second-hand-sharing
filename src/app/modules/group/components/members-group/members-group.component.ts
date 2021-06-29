// tslint:disable: no-inferrable-types
// tslint:disable: prefer-for-of
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-members-group',
    templateUrl: './members-group.component.html',
    styleUrls: ['./members-group.component.scss'],
})
export class MembersGroupComponent implements OnInit {
    @Input() myRole: string = '';
    @Input() groupId: number = -1;
    isJoined: boolean = false;
    isAdmin: boolean = false;
    selectedUser: number = -1;
    requestList = [
        {
            requesterId: 15,
            requesterName: 'Phuoc',
            joinStatus: 1,
            createDate: '2021-06-26T14:57:25.521946',
            avatarUrl: null,
        },
        {
            requesterId: 6,
            requesterName: 'Dũng Nguyễn',
            joinStatus: 1,
            createDate: '2021-06-26T16:15:59.256086',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/9d0101f9-1948-4efe-b885-cfde5f0bb7b2',
        },
        {
            requesterId: 14,
            requesterName: 'Lê Trường Vix',
            joinStatus: 1,
            createDate: '2021-06-29T04:57:42.100221',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/3ece2764-dd47-480a-9be0-8b761050a3bb',
        },
    ];
    memberList = [
        {
            userId: 2,
            fullName: 'Hữu Dũng',
            joinDate: '2021-05-20T15:02:04.612614',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/d60c8f27-6441-4b6c-8c35-6f621cf60aae',
        },
    ];
    adminList = [
        {
            userId: 3,
            fullName: 'Lê Trường Vĩ',
            joinDate: '2021-05-20T15:02:04.612614',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/ab55b9e5-8f84-4fdc-92d6-b8978929ec05',
        },
        {
            userId: 10,
            fullName: 'Phuoc',
            joinDate: '2021-06-05T11:16:10.012874',
            avatarUrl: null,
        },
        {
            userId: 5,
            fullName: 'Ngan',
            joinDate: '2021-06-29T11:24:24.93362',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
        },
        {
            userId: 1,
            fullName: 'Lê Mậu Toàn',
            joinDate: '2021-06-29T11:24:30.449597',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/34115965-f193-449e-a522-b26a7b7a2538',
        },
        {
            userId: 4,
            fullName: 'Do Thi Kim Ngan',
            joinDate: '2021-06-29T11:24:37.669999',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/769c16aa-ede8-4865-937f-c8df23c91bca',
        },
    ];

    constructor() {}

    ngOnInit(): void {
        // gọi api get member list và get admin
        if (this.myRole !== '') {
            this.isJoined = true;
            if (this.myRole === 'admin') {
                this.isAdmin = true;
            }
        }
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnChanges(): void {
        if (this.myRole !== '') {
            this.isJoined = true;
            if (this.myRole === 'admin') {
                this.isAdmin = true;
            }
        }
    }

    onDisplayMenu = (user: any) => {
        if (this.selectedUser === user?.userId) {
            this.selectedUser = -1;
        } else {
            this.selectedUser = user?.userId;
        }
    }

    onKickMember = (user: any) => {
        // gọi api kick member
        console.log('kick: ', user);
    }

    onUpToAdmin = (user: any) => {
        // gọi api thăng quyền admin
        console.log('up to admin:', user);
    }

    onDownToMember = (user: any) => {
        // gọi api xuống quyền thành member
        console.log('down to member:', user);
    }

    onAcceptToJoin = (request: any) => {
        // gọi api chấp nhận cho người dùng tham gia group
        console.log('accept:', request);
    }

    onDeclineToJoin = (request: any) => {
        // gọi api từ chối người dùng tham gia group
        console.log('decline:', request);
    }
}
