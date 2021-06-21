import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryClient } from 'src/app/core/api-clients/category.client';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { ItemClient } from 'src/app/core/api-clients/item.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Item } from 'src/app/core/constants/item.constant';

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit, OnChanges {
    @Input() category: number;
    @Input() donations: boolean;
    @Input() donationsId: number;
    @Input() registration: boolean;

    myInfo;
    itemListScrollDistance = 3;
    itemListScrollThrottle = 50;
    items: Item[];
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
        const donationsUserId = this.donationsId ? this.donationsId : this.myInfo?.id
        // tslint:disable-next-line: no-unused-expression
        !this.donations
            ? !this.registration
                ? this.homeClient.getItems(this.defaultReq).subscribe(
                      (response) => {
                          this.items = response.data;
                      },
                      (error) => this.toastr.error(error)
                  )
                : this.itemClient.getMyRegistration(this.myInfo?.id).subscribe(
                      (response) => {
                          this.items = response.data;
                      },
                      (error) => console.log(error)
                  )
            : this.itemClient.getMyDonations(donationsUserId).subscribe(
                  (response) => {
                      this.items = response.data;
                  },
                  (error) => console.log(error)
              );
    }

    // tslint:disable: use-lifecycle-interface
    // tslint:disable-next-line: typedef
    ngOnChanges(changes: SimpleChanges) {
        this.defaultPageNumber = 1;
        if (this.category === 0) {
            this.homeClient.getItems(this.defaultReq).subscribe((response) => {
                this.items = response.data;
            });
        }

        if (this.category !== 0) {
            this.categoryClient
                .getItemByCategory(this.category, this.defaultReq)
                .subscribe((response) => {
                    this.items = response.data;
                });
        }
    }

    onItemListScrollDown = () => {
        if (!this.donations) {
            this.defaultPageNumber += 1;
            const newReq = new SearchRequest(this.defaultPageNumber, this.defaultPageSize);
            this.homeClient.getItems(newReq).subscribe((response) => {
                this.items = [...this.items, ...response.data];
            });
        }
    };
}
