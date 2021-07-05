import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { MessageClient } from 'src/app/core/api-clients/message.client';
import { UserAward } from 'src/app/core/constants/user.constant';
import { NotificationService } from '../../service/notification.service';

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

    constructor(
        private messageClient: MessageClient,
        private authClient: AuthClient,
        private notificationService: NotificationService
    ) {}

    topUserData: UserAward[];
    userMessageData: any;
    myInfo;
    currentMonth = new Date().getMonth() + 1;
    isNewMessage = false;

    // noti
    subscriptionNoti: Subscription;

    // new message array by user id
    unreadUserMessage = [];
    messageBoxId = -1;

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

        this.subscriptionNoti = this.notificationService.currentNoti.subscribe((message: any) => {
            if (message?.type === '1') {
                const temp = JSON.parse(message?.message);
                if (this.unreadUserMessage.includes(temp?.sendFromAccountId) === false) {
                    this.unreadUserMessage.push(temp?.sendFromAccountId);
                }
                const isFirstUser = this.handleDisplayFirstUser(
                    this.userMessageData?.data,
                    message
                );
                if (isFirstUser === false) {
                    this.messageClient.getRecentMessage(1, 100).subscribe(
                        (response) => {
                            this.userMessageData = response;
                        },
                        (error) => console.log(error)
                    );
                }
            }
            this.handleDisplayNew(this.userMessageData?.data);
        });
    }

    ngOnChanges(): void {
        if (this.userMessageData && this.message) {
            const temp = this.isOldMessageUser(this.userMessageData, this.message);
            if (temp === false) {
                this.messageClient.getRecentMessage(1, 100).subscribe(
                    (response) => {
                        this.userMessageData = response;
                    },
                    (error) => console.log(error)
                );
            }
        }
        if (this.openMessageBox === false) {
            this.messageBoxId = -1;
        }
    }

    onOpenMessageModal = (user) => {
        this.handleRemoveNew(user);
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

    handleDisplayNew = (users: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < users?.length; i++) {
            users[i].newMessage = false;
            if (users[i].sendFromAccountId !== this.myInfo.id) {
                if (
                    this.unreadUserMessage.includes(users[i].sendFromAccountId) === true &&
                    this.messageBoxId !== users[i].sendFromAccountId
                ) {
                    users[i].newMessage = true;
                }
            } else {
                if (
                    this.unreadUserMessage.includes(users[i].sendToAccountId) === true &&
                    this.messageBoxId !== users[i].sendFromAccountId
                ) {
                    users[i].newMessage = true;
                }
            }
        }
    };

    handleRemoveNew = (user: any) => {
        if (user.sendFromAccountId !== this.myInfo.id) {
            this.messageBoxId = user.sendFromAccountId;
            if (this.unreadUserMessage.includes(user.sendFromAccountId) === true) {
                user.newMessage = false;
                const index = this.unreadUserMessage.indexOf(user?.sendFromAccountId);
                if (index !== -1) {
                    this.unreadUserMessage.splice(index, 1);
                }
            }
        } else {
            this.messageBoxId = user.sendToAccountId;
            if (this.unreadUserMessage.includes(user.sendToAccountId) === true) {
                user.newMessage = false;
                const index = this.unreadUserMessage.indexOf(user?.sendToAccountId);
                if (index !== -1) {
                    this.unreadUserMessage.splice(index, 1);
                }
            }
        }
    };

    handleDisplayFirstUser = (users, message) => {
        let isFirstUserPos = true;
        const jsonMessage = JSON.parse(message?.message);
        if (users.length > 0) {
            if (users[0].sendFromAccountId !== this.myInfo.id) {
                if (users[0].sendFromAccountId !== jsonMessage.sendFromAccountId) {
                    isFirstUserPos = false;
                }
            } else {
                if (users[0].sendToAccountId !== jsonMessage.sendFromAccountId) {
                    isFirstUserPos = false;
                }
            }
        }
        return isFirstUserPos;
    };
}
