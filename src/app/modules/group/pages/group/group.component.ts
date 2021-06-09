import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: [
        './group.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_button.scss',
    ],
})
export class GroupComponent implements OnInit {
    groupData = {
        id: 1,
        groupName: 'test 2',
        description: 'string',
        createDate: '2021-05-20T15:02:03.842292',
        rules: '12',
    };

    isOpenModal = false;

    constructor() {}

    ngOnInit(): void {}

    handleOpenModal = () => {
      this.isOpenModal = true;
    }
}
