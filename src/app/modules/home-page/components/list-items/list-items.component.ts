import { Component, OnInit } from '@angular/core';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { Item } from 'src/app/core/constants/item.constant';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  items: Item[];
  pageNumber: number;
  pageSize: number;
  message: string;

  constructor(private homeClient:HomeClient) { }

  ngOnInit(): void {
    this.homeClient.getItems().subscribe(
      response => {
        this.items = response.data;
        console.log("items:", this.items);
      },
      error => console.log(error)
    )
  }

  subtractDate = (date: string) => {
    const endDate = new Date();
    const startDate = new Date(date);
    const diff = endDate.getTime() - startDate.getTime();
    const years = Math.floor(diff / (60 * 60 * 24 * 1000 * 365));
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if (years > 0) {
        return (years + ' năm trước')
    }
    if (days > 0) {
        return (days + ' ngày trước')
    }
    if (hours > 0) {
        return (hours + ' giờ trước')
    }
    if (minutes > 0) {
        return (minutes + ' phút trước')
    }
    if (seconds > 0) {
        return (seconds + ' giây trước')
    }
  }
}
