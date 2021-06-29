// tslint:disable: no-inferrable-types

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-items-group',
    templateUrl: './items-group.component.html',
    styleUrls: ['./items-group.component.scss'],
})
export class ItemsGroupComponent implements OnInit {
    @Input() groupId: number;
    @Input() myRole: string = '';

    userAvatar = '';
    isOpenModal = false;
    isJoined = false;
    isAdmin = false;

    constructor() {}

    ngOnInit(): void {
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.userAvatar = user?.avatarUrl;
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnChanges(): void {
        if (this.myRole !== '' && this.myRole !== 'member') {
            this.isJoined = true;
            if (this.myRole === 'admin') {
                this.isAdmin = true;
            }
        }
    }

    onCreateEvent = () => {
        this.isOpenModal = true;
    };
}
