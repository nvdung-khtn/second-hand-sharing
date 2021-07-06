import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryClient } from 'src/app/core/api-clients/category.client';
import { EventClient } from 'src/app/core/api-clients/event.client';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { ItemClient } from 'src/app/core/api-clients/item.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Item } from 'src/app/core/constants/item.constant';

@Component({
    selector: 'app-list-items-event',
    templateUrl: './list-items-event.component.html',
    styleUrls: ['./list-items-event.component.scss'],
})
export class ListItemsEventComponent implements OnInit {
    @Input() eventDetail;

    myRole = '';

    isEventEnded = false;

    listItemEvent = [];

    eventId: number;
    groupId: number;

    loading = false;
    isEnd = false;
    myInfo;
    itemListScrollDistance = 3;
    itemListScrollThrottle = 50;
    pageNumber: number;
    pageSize: number;
    message: string;
    isOpenModal = false;
    defaultReq: SearchRequest;

    // tslint:disable: no-inferrable-types
    private defaultPageNumber: number = 1;
    private defaultPageSize: number = 200;

    constructor(
        private homeClient: HomeClient,
        private categoryClient: CategoryClient,
        private toastr: ToastrService,
        private itemClient: ItemClient,
        private route: ActivatedRoute,
        private eventClient: EventClient,
        private groupClient: GroupClient
    ) {
        this.defaultReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
    }

    ngOnInit(): void {
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
        this.groupId = Number(this.route.snapshot.paramMap.get('groupId'));
        this.checkDate();
        // gọi api get list event items
        this.getMyRole(this.groupId, this.myInfo?.id);
    }

    // tslint:disable: use-lifecycle-interface
    // tslint:disable-next-line: typedef
    ngOnChanges(changes: SimpleChanges) {
        this.defaultPageNumber = 1;
        this.isEnd = false;
        // gọi api get list event items
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                if (response.succeeded) {
                    this.myRole = response.message;
                    if (this.myRole !== '') {
                        this.eventClient
                            .getAllItemsInEvent(this.defaultReq, this.eventId)
                            .subscribe((response) => {
                                this.listItemEvent = response?.data;
                            });
                    } else {
                        this.eventClient
                            .getMyDonations(this.defaultReq, this.eventId)
                            .subscribe((response) => {
                                this.listItemEvent = response?.data;
                            });
                    }
                }
            },
            (error) => {
                this.eventClient
                    .getMyDonations(this.defaultReq, this.eventId)
                    .subscribe((response) => {
                        this.listItemEvent = response?.data;
                    });
                console.log(error);
            }
        );
    };

    onItemListScrollDown = () => {
        // gọi api get list events items tương tự list items trên trang chủ
    };

    onClickPost() {
        this.isOpenModal = true;
    }

    checkDate = () => {
        const gmt0Time = new Date().toString().replace('+0700', '+1400');
        const now = new Date(gmt0Time);
        const end = new Date(this.eventDetail?.endDate);
        if (now >= end) {
            this.isEventEnded = true;
        }
    };
}
