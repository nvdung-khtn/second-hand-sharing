import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
    tabContext = [
        {
            id: 1,
            name: 'Thông tin',
        },
        {
            id: 2,
            name: 'Danh sách vật phẩm',
        },
    ];

    selectedTab = 1;
    eventId: number;
    isMember = false;
    myRole = '';

    eventDetail: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupClient: GroupClient
    ) {}

    ngOnInit(): void {
        this.eventId = Number(this.route.snapshot.paramMap.get('id'));
        this.getEventInfo(this.eventId);
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.getMyRole(this.eventDetail?.groupId, user?.id);
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                this.myRole = response.message;
                if (this.myRole !== ''  && this.myRole !== 'member') {
                    this.isMember = true;
                }
                if (this.myRole !== ''  && this.myRole !== 'member') {
                    this.selectedTab = 2;
                } else {
                    this.selectedTab = 1;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    getEventInfo = (eventId: number) => {
        // call api get event detail
        this.eventDetail = {
            id: 1,
            eventName: 'Event quyên góp cho đồng bào lũ lụt',
            startDate: '2021-06-24T15:11:10.912',
            endDate: '2021-06-30T15:11:10.912',
            content: 'Đây là event nhằm quyên góp cho đồng bào bị lũ lụt miền Trung',
            groupId: 1,
        };
    };

    onSelectTab = (id: number) => {
        this.selectedTab = id;
    };

    selectFile(event: any): void {
        const image: FileList = event.target.files;
        if (image) {
            // api update event avatar
        }
    }
}
