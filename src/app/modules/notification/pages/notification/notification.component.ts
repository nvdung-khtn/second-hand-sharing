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
    loading = false;
    NotifyType = NotifyType;
    private defaultPageNumber: number = 1;
    private defaultPageSize: number = 100;
    myInfo;
    notificationScrollDistance = 99;
    notificationScrollThrottle = 50;
    defaultReq: SearchRequest;
    notifications: Notification[] = [];

    @Output() modalChange = new EventEmitter<boolean>();
    @Output() userInfo = new EventEmitter<any>();

    constructor(private notificationClient: NotificationClient, private router: Router) {
        this.defaultReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
    }

    async ngOnInit() {
        this.loading = true;
        // tslint:disable-next-line: prefer-for-of
        const response = await this.notificationClient
            .getNotifications(this.defaultReq)
            .toPromise();
        this.notifications = response.data;
        this.loading = false;

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.notifications.length; i++) {
            this.notifications[i].data = JSON.parse(this.notifications[i].data);
        }
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    handleReceiverName(data: any) {
        return data?.receiverId !== this.myInfo.id ? data?.receiverName : 'bạn';
    }

    handleRequestStatus(id: number) {
        return id === 0 ? 'bị hủy' : 'được chấp nhận';
    }

    onNotificationScrollDown() {
        this.loading = true;
        this.defaultPageNumber += 1;
        const newReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
        this.notificationClient.getNotifications(newReq).subscribe((response) => {
            let result: Notification[] = response.data;
            for (let i = 0; i < result.length; i++) {
                result[i].data = JSON.parse(result[i].data);
            }
            this.notifications = [...this.notifications, ...result];
            this.loading = false;
        });
    }

    handleNotiType(type: number, index) {
        if (type !== 5) {
            this.loading = true;
            const data: any = this.notifications[index].data;
            this.router.navigate(['/item', data.itemId]).then(() => {
                this.loading = false;
            });
        }
    }
}
