import { Component, Input, OnInit } from '@angular/core';
import { CategoryClient } from 'src/app/core/api-clients/category.client';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { Item } from 'src/app/core/constants/item.constant';

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
    @Input() category: number;

    items: Item[];
    pageNumber: number;
    pageSize: number;
    message: string;
    isOpenModal = false;
    noData = false;

    constructor(private homeClient: HomeClient, private categoryClient: CategoryClient) {}

    ngOnInit(): void {
        this.homeClient.getItems().subscribe(
            (response) => {
                this.items = response.data;
            },
            (error) => console.log(error)
        );
    }

    // tslint:disable: use-lifecycle-interface
    // tslint:disable-next-line: typedef
    ngOnChanges() {
        if (this.category === 0) {
            this.noData = false;
            this.homeClient.getItems().subscribe(
                (response) => {
                    this.items = response.data;
                    if (this.items.length === 0) {
                        this.noData = true;
                    }
                },
                (error) => console.log(error)
            );
        }
        if (this.category !== 0) {
            this.noData = false;
            this.categoryClient.getItemByCategory(this.category).subscribe(
                (response) => {
                    this.items = response.data;
                    if (this.items.length === 0) {
                        this.noData = true;
                    }
                },
                (error) => console.log(error)
            );
        }
    }
}
