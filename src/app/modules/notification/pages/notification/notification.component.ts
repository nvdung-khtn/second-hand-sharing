import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationClient } from 'src/app/core/api-clients/notification.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { NotifyType, Notification } from '../../../../core/constants/notification.constant';
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    NotifyType = NotifyType;
    private defaultPageNumber: number = 1;
    private defaultPageSize: number = 3;
    myInfo;
    notificationScrollDistance = 2;
    notificationScrollThrottle = 50;
    defaultReq: SearchRequest;
    notifications: Notification[] = [];

    @Output() modalChange = new EventEmitter<boolean>();
    @Output() userInfo = new EventEmitter<any>();

    constructor(private notificationClient: NotificationClient, private router: Router) {
        this.defaultReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
    }

    async ngOnInit() {
        // tslint:disable-next-line: prefer-for-of
        let response = await this.notificationClient.getNotifications(this.defaultReq).toPromise();
        this.notifications = response.data;

        for (let i = 0; i < this.notifications.length; i++) {
            this.notifications[i].data = JSON.parse(this.notifications[i].data);
        }
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(this.notifications);
    }

    handleReceiverName(id: number) {
        return id !== this.myInfo.id ? id : 'bạn';
    }

    handleRequestStatus(id: number) {
        return id === 0 ? 'bị hủy' : 'được chấp nhận';
    }

    onNotificationScrollDown() {
        this.defaultPageNumber += 1;
        const newReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
        this.notificationClient.getNotifications(newReq).subscribe((response) => {
            let result: Notification[] = response.data;

            for (let i = 0; i < result.length; i++) {
                result[i].data = JSON.parse(result[i].data);
            }
            this.notifications = [...this.notifications, ...result];
        });
    }

    handleNotiType(type: number, index) {
        switch (type) {
            case 2:
            case 3:
            case 4:
            case 6:
                const data: any = this.notifications[index].data;
                this.router.navigate(['/item', data.itemId]);
                return;
            case 5:
                // Tin nhan
                // this.modalChange.emit(true);
                // this.userInfo.emit(this.notifications[index].data);
                return 'SEND_THANKS';
        }
    }
}
