import { Component, OnInit } from '@angular/core';

enum NotificationType {
    NONE,
    MESSAGE,
    RECEIVE_REQUEST,
    CANCEL_RECEIVE_REQUEST,
    REQUEST_STATUS,
    SEND_THANKS,
    CONFIRM_SENT,
}
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    notiType = NotificationType;
    myInfo;

    notificationData = [
        {
            id: 344,
            type: 5,
            data: '{\n  "content": "Thank you so much!",\n  "sendDate": "2021-06-07T10:47:29.6385048Z",\n  "sendFromAccountId": 3,\n  "sendFromAccountName": "Lê Trường Vĩ"\n}',
            userId: 14,
            createTime: '2021-06-07T10:47:30.095922',
        },
        {
            id: 339,
            type: 2,
            data: '{\n  "id": 202,\n  "receiverId": 3,\n  "receiverName": "Lê Trường Vĩ",\n  "itemId": 66,\n  "itemName": "TEST ACC ID 14",\n  "receiveReason": "test dki",\n  "createDate": "2021-06-07T09:49:17.4375088Z"\n}',
            userId: 14,
            createTime: '2021-06-07T09:49:17.462289',
        },
        {
            id: 335,
            type: 6,
            data: '{\n  "itemId": 65,\n  "itemName": "Lê Trường Vĩ Test",\n  "receiverId": 14,\n  "receiverName": "vĩ 2"\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:37.106977',
        },
        {
            id: 334,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 1\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:32.480706',
        },
        {
            id: 333,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 0\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:31.360231',
        },
        {
            id: 332,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 1\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:28.098888',
        },
        {
            id: 331,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 0\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:26.092084',
        },
        {
            id: 330,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 1\n}',
            userId: 14,
            createTime: '2021-06-03T04:39:22.689719',
        },
        {
            id: 329,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 0\n}',
            userId: 14,
            createTime: '2021-06-03T02:41:31.637383',
        },
        {
            id: 262,
            type: 4,
            data: '{\n  "itemId": 65,\n  "requestId": 171,\n  "itemName": "Lê Trường Vĩ Test",\n  "requestStatus": 1\n}',
            userId: 14,
            createTime: '2021-06-02T15:38:29.644488',
        },
    ];

    NotificationType = NotificationType;

    constructor() {}

    ngOnInit(): void {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.notificationData.length; i++) {
            this.notificationData[i].data = JSON.parse(this.notificationData[i].data);
        }
        console.log(this.notificationData);
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    handleReceiverName = (id: number) => {
        return id !== this.myInfo.id ? id : 'bạn';
    }

    handleRequestStatus = (id: number) => {
        return id === 0 ? 'bị hủy' : 'được chấp nhận';
    }

    /* handleNotiType = (type: number) => {
        switch (type) {
            case 2:
                return 'RECEIVE_REQUEST';
            case 3:
                return 'CANCEL_RECEIVE_REQUEST';
            case 4:
                return 'REQUEST_STATUS';
            case 5:
                return 'SEND_THANKS';
            case 6:
                return 'CONFIRM_SENT';
        }
    } */
}
