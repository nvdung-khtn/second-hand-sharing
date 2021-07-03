import { Component, OnInit } from '@angular/core';
import { MessageClient } from 'src/app/core/api-clients/message.client';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
    userMessageData: any;
    myInfo;

    constructor(private messageClient: MessageClient) {}

    ngOnInit(): void {
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));

        this.messageClient.getRecentMessage(1, 100).subscribe(
            (response) => {
                this.userMessageData = response?.data;
            },
            (error) => console.log(error)
        );
    }
    handleAccountName = (user: any) => {
        // tslint:disable-next-line: no-unused-expression
        let name = '';
        user.sendFromAccountId !== this.myInfo.id
            ? (name = user.sendFromAccountName)
            : (name = user.sendToAccountName);
        return name;
    };

    handleAvatar = (user: any) => {
        // tslint:disable-next-line: no-unused-expression
        let avatar = '';
        user.sendFromAccountId !== this.myInfo.id
            ? (avatar = user.sendFromAccountAvatarUrl)
            : (avatar = user.sendToAccountAvatarUrl);
        return avatar;
    };

    handleUserId = (user: any) => {
        // tslint:disable-next-line: no-unused-expression
        let id = '';
        user.sendFromAccountId !== this.myInfo.id
            ? (id = user.sendFromAccountId)
            : (id = user.sendToAccountId);
        return id;
    };
}
