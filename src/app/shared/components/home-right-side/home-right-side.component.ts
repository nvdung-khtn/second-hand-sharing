import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { MessageClient } from 'src/app/core/api-clients/message.client';
import { UserAward } from 'src/app/core/constants/user.constant';

@Component({
    selector: 'app-home-right-side',
    templateUrl: './home-right-side.component.html',
    styleUrls: ['./home-right-side.component.scss'],
})
export class HomeRightSideComponent implements OnInit {
    @Input() openMessageBox;
    @Input() message;
    @Output() modalChange = new EventEmitter<boolean>();
    @Output() userInfo = new EventEmitter<any>();

    constructor(private messageClient: MessageClient, private authClient: AuthClient) {}

    topUserData: UserAward[];
    userMessageData: any;
    myInfo;
    currentMonth = new Date().getMonth();
    isNewMessage = false;

    ngOnInit(): void {
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));

        this.messageClient.getRecentMessage(1, 100).subscribe(
            (response) => {
                this.userMessageData = response;
            },
            (error) => console.log(error)
        );

        this.authClient.getTopAward().subscribe(
            (response) => {
                this.topUserData = response.data;
            },
            (error) => console.log(error)
        );
    }

    ngOnChanges(): void {
        if (this.userMessageData && this.message) {
            const temp = this.isOldMessageUser(this.userMessageData, this.message)
            if (temp === false) {
                this.messageClient.getRecentMessage(1, 100).subscribe(
                    (response) => {
                        this.userMessageData = response;
                    },
                    (error) => console.log(error)
                );
            }
        }
    }

    onOpenMessageModal = (user) => {
        this.openMessageBox = true;
        this.modalChange.emit(this.openMessageBox);
        this.userInfo.emit(user);
    };

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

    isOldMessageUser = (user, messsage): boolean => {
        let isOld = false;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < user?.data?.length; i++) {
            if (user?.data[i].sendFromAccountId !== this.myInfo.id) {
                if (user?.data[i].sendFromAccountId === messsage.sendFromAccountId) {
                    isOld = true;
                }
            } else {
                if (user?.data[i].sendToAccountId === messsage.sendFromAccountId) {
                    isOld = true;
                }
            }
        }
        return isOld;
    };
}
