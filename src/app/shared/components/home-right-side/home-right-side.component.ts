import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageClient } from 'src/app/core/api-clients/message.client';

@Component({
    selector: 'app-home-right-side',
    templateUrl: './home-right-side.component.html',
    styleUrls: ['./home-right-side.component.scss'],
})
export class HomeRightSideComponent implements OnInit {
    @Input() openMessageBox;
    @Output() modalChange = new EventEmitter<boolean>();
    @Output() userInfo = new EventEmitter<any>();

    constructor(private messageClient: MessageClient) {}

    topUserData = [
        {
            name: 'Nguyễn Văn A',
            times: 30,
            avatarURL: 'assets/image/default-avatar.png',
        },
        {
            name: 'Lê Đạt',
            times: 15,
            avatarURL: 'assets/image/default-avatar.png',
        },
        {
            name: 'Tiến Nguyễn',
            times: 10,
            avatarURL: 'assets/image/default-avatar.png',
        },
    ];

    userMessageData: any;
    myInfo;

    ngOnInit(): void {
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));

        this.messageClient.getRecentMessage(1, 100).subscribe(
            (response) => {
                this.userMessageData = response;
            },
            (error) => console.log(error)
        );
    }

    onOpenMessageModal = (user) => {
        this.openMessageBox = true;
        this.modalChange.emit(this.openMessageBox);
        this.userInfo.emit(user);
    }

    handleAccountName = (user: any) => {
        // tslint:disable-next-line: no-unused-expression
        let name = '';
        user.sendFromAccountId !== this.myInfo.id
            ? (name = user.sendFromAccountName)
            : (name = user.sendToAccountName);
        return name;
    }

    handleAvatar = (user: any) => {
        // tslint:disable-next-line: no-unused-expression
        let avatar = '';
        user.sendFromAccountId !== this.myInfo.id
            ? (avatar = user.sendFromAccountAvatarUrl)
            : (avatar = user.sendToAccountAvatarUrl);
        return avatar;
    }
}
