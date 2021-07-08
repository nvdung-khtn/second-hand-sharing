import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventClient } from 'src/app/core/api-clients/event.client';
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

    selectedTab = 2;
    eventId: number;
    isMember = false;
    myRole = '';

    eventDetail: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupClient: GroupClient,
        private eventClient: EventClient,
    ) {}

    ngOnInit(): void {
        this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
        this.getEventInfo(this.eventId);
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                this.myRole = response.message;
                if (this.myRole !== '') {
                    this.isMember = true;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    getEventInfo = (eventId: number) => {
        // call api get event detail
        this.eventClient.getEventById(eventId).subscribe(
            (response) => {
                this.eventDetail = response?.data;
                const user: any = JSON.parse(localStorage.getItem('userInfo'));
                this.getMyRole(this.eventDetail?.groupId, user?.id);
            },
            (error) => {
                console.log(error);
                this.router.navigateByUrl(`/404`);
            }
        );
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
