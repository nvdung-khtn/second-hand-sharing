import { Component, Input, OnInit } from '@angular/core';
import { EventClient } from 'src/app/core/api-clients/event.client';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit {
    @Input() groupId: number = -1;
    @Input() allEvent: boolean = false;
    @Input() searchString: string = '';

    events = [];
    getAllEventRequest: SearchRequest;

    constructor(private eventClient: EventClient, private groupClient: GroupClient) {
        this.getAllEventRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        if (this.allEvent === true && this.groupId === -1) {
            // fake data
            this.handleGetAllEvent(this.getAllEventRequest);
        }
        else {
            if (this.allEvent === false && this.groupId !== -1) {
                this.groupClient.getGroupEvent(this.getAllEventRequest, this.groupId).subscribe((response) => {
                    this.events = response?.data;
                })
            }
        }
    }

    ngOnChanges(): void {
        if (this.allEvent === true && this.groupId === -1) {
            // fake data
            this.handleGetAllEvent(this.getAllEventRequest);
        }
        else {
            if (this.allEvent === false && this.groupId !== -1) {
                this.groupClient.getGroupEvent(this.getAllEventRequest, this.groupId).subscribe((response) => {
                    this.events = response?.data;
                })
            }
        }
    }

    handleGetAllEvent = (request) => {
        if (this.searchString === '') {
            this.eventClient.getAllAvailableEvent(request).subscribe((response) => {
                this.events = response?.data;
            })
        }
        else {
            this.eventClient.getSearchAllAvailableEvent(request, this.searchString).subscribe((response) => {
                this.events = response?.data;
            })
        }
    }

}
