import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupClient } from 'src/app/core/api-clients/group.client';

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
    isOpenGroupModal = false;
    groupForm: FormGroup;
    groupData = [/* {
        id: 1,
        groupName: 'test 2',
        description: 'string',
        createDate: '2021-05-20T15:02:03.842292',
        rules: '12',
    } */]

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder) {}

    ngOnInit(): void {}

    handleOpenModal() {
        this.isOpenGroupModal = true;
    }
}
