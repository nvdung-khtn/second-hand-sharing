import { Component, OnInit } from '@angular/core';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { Item } from 'src/app/core/constants/item.constant';

@Component({
    selector: 'app-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
    items: Item[];
    pageNumber: number;
    pageSize: number;
    message: string;
    isOpenModal = false;

    constructor(private homeClient: HomeClient) {}

    ngOnInit(): void {
        this.homeClient.getItems().subscribe(
            (response) => {
                this.items = response.data;
            },
            (error) => console.log(error)
        );
    }
}
