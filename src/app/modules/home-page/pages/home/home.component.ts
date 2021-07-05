import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagingService } from 'src/app/shared/service/message.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    defaultSelectedCategory = 0;
    selectedCategory = 0; // follow selected category id to display data

    // search
    searchInput = '';
    searchStringToChild = '';

    modelChanged: Subject<string> = new Subject<string>();

    constructor(private messagingService: MessagingService) {
        this.modelChanged.pipe(
            debounceTime(1000), 
            distinctUntilChanged())
            .subscribe(model => {this.searchStringToChild = model});
    }

    onCategoryChange = (event: any) => {
        this.selectedCategory = event;
    };

    ngOnInit(): void {
        const myInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.messagingService.requestPermission(myInfo?.id);
    }

    onSearch = () => {
        this.searchStringToChild = this.searchInput;
    }

    delayAutoSearch = (text: string) => {
        this.modelChanged.next(text);
    }
}
