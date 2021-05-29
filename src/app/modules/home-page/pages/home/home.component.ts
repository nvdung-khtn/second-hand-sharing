import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MessagingService } from 'src/app/shared/service/message.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    defaultSelectedCategory = 0;
    selectedCategory = 0; // follow selected category id to display data

    constructor(private messagingService: MessagingService) {}

    onCategoryChange = (event: any) => {
        this.selectedCategory = event;
    };

    ngOnInit(): void {
        const myInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.messagingService.requestPermission(myInfo?.id);
    }
}
