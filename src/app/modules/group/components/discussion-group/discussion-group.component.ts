import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-discussion-group',
    templateUrl: './discussion-group.component.html',
    styleUrls: ['./discussion-group.component.scss'],
})
export class DiscussionGroupComponent implements OnInit {
    @Input() myRole: string = '';
    @Input() groupId: number;

    // user
    userAvatar: '';

    // modal
    isOpenModal = false;

    constructor() {}

    ngOnInit(): void {
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.userAvatar = user?.avatarUrl;
    }

    onCreatePost = () => {
        this.isOpenModal = true;
    }
}
