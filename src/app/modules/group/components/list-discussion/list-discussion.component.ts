import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-list-discussion',
    templateUrl: './list-discussion.component.html',
    styleUrls: ['./list-discussion.component.scss'],
})
export class ListDiscussionComponent implements OnInit {
    // group
    groupId = -1;

    listDiscussion = [
        {
            id: 1,
            content: 'Đây là content của tôi viết',
            postTime: '2021-07-03T14:40:25.990544',
            imageUrl: null,
            postByAccountName: 'Ngan',
            avatarUrl: null,
        },
        {
            id: 1,
            content: 'Đây là content của tôi viết',
            postTime: '2021-07-03T14:40:25.990544',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            postByAccountName: 'Lê Trường Vĩ',
            avatarUrl: 'https://storage.googleapis.com/secondhandsharing.appspot.com/3ece2764-dd47-480a-9be0-8b761050a3bb',
        },
    ];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.groupId = Number(this.route.snapshot.paramMap.get('id'));
        // gọi api để lấy tất cả bài post trong group và gán vào listDiscusstion
    }
}
