import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-list-events',
    templateUrl: './list-events.component.html',
    styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit {
    @Input() groupId: number;

    groupEvents = [
        {
            id: 1,
            eventName: 'Event quyên góp cho đồng bào lũ lụt',
            startDate: '2021-06-24T15:11:10.912',
            endDate: '2021-06-30T15:11:10.912',
            content: 'Đây là event nhằm quyên góp cho đồng bào bị lũ lụt miền Trung',
            groupId: 1,
        },
        {
            id: 2,
            eventName: 'Event quyên góp cho trẻ em nghèo khó',
            startDate: '2021-06-24T15:11:10.912',
            endDate: '2021-07-30T15:11:10.912',
            content: 'Event tạo ra nhằm kêu gọi các thành viên trong nhóm quyên góp cho trẻ em có hoàn cảnh khó khăn',
            groupId: 1,
        },
    ];

    constructor() {}

    ngOnInit(): void {
        console.log(this.groupId)
    }
}
