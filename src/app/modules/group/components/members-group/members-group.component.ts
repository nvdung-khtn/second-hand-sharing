import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-members-group',
    templateUrl: './members-group.component.html',
    styleUrls: ['./members-group.component.scss'],
})
export class MembersGroupComponent implements OnInit {
    requestList = [];
    memberList = [
        {
            userId: 4,
            fullName: 'Do Thi Kim Ngan',
            joinDate: '2021-06-10T02:37:36.954778',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/769c16aa-ede8-4865-937f-c8df23c91bca',
        },
        {
            userId: 5,
            fullName: 'Ngan',
            joinDate: '2021-06-26T14:57:25.521946',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
        },
        {
            userId: 15,
            fullName: 'Phuoc',
            joinDate: '2021-06-26T14:57:25.521946',
            avatarUrl: null,
        },
        {
            userId: 6,
            fullName: 'Dũng Nguyễn',
            joinDate: '2021-06-26T16:15:59.256086',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/9d0101f9-1948-4efe-b885-cfde5f0bb7b2',
        },
        {
            userId: 1,
            fullName: 'Lê Mậu Toàn',
            joinDate: '2021-06-26T16:15:59.256086',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/34115965-f193-449e-a522-b26a7b7a2538',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
