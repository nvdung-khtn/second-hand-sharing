import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryClient } from 'src/app/core/api-clients/category.client';
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
    listItemEvent = [
        {
            id: 88,
            itemName: 'test donate group 3 2',
            address: {
                street: '123 street',
                wardId: 14,
                districtId: 9,
                cityId: 15,
            },
            postTime: '2021-06-28T15:26:34.283266',
            description: 'test donate item for group 3 2',
            imageUrl: null,
            donateAccountName: 'Ngan',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
            status: 0,
        },
        {
            id: 87,
            itemName: 'test donate group 3',
            address: {
                street: '123 street',
                wardId: 14,
                districtId: 9,
                cityId: 15,
            },
            postTime: '2021-06-27T15:26:34.283266',
            description: 'test donate item for group 3',
            imageUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/36844963-9409-43de-bc26-48c9290fbf9b',
            donateAccountName: 'Ngan',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
            status: 1,
        },
        {
            id: 89,
            itemName: 'test donate group 3 2',
            address: {
                street: '123 street',
                wardId: 14,
                districtId: 9,
                cityId: 15,
            },
            postTime: '2021-06-25T15:26:34.283266',
            description: 'test donate item for group 3 3',
            imageUrl: null,
            donateAccountName: 'Ngan',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
            status: 1,
        },
        {
            id: 90,
            itemName: 'test donate group 3 2',
            address: {
                street: '123 street',
                wardId: 14,
                districtId: 9,
                cityId: 15,
            },
            postTime: '2021-06-24T15:26:34.283266',
            description: '12',
            imageUrl: null,
            donateAccountName: 'Ngan',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
            status: 0,
        },
    ];

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
    private defaultPageSize: number = 4;

    constructor(
        private homeClient: HomeClient,
        private categoryClient: CategoryClient,
        private toastr: ToastrService,
        private itemClient: ItemClient
    ) {
        this.defaultReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
    }

    ngOnInit(): void {
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
        // tslint:disable-next-line: no-unused-expression
        // gọi api get list event items
    }

    // tslint:disable: use-lifecycle-interface
    // tslint:disable-next-line: typedef
    ngOnChanges(changes: SimpleChanges) {
        this.defaultPageNumber = 1;
        this.isEnd = false;
        // gọi api get list event items
    }

    onItemListScrollDown = () => {
        // gọi api get list events items tương tự list items trên trang chủ
    };

    onClickPost = () => {
      this.isOpenModal = true;
    }
}
