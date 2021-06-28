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
    joinedGroup;
    isLoading = false;

    allGroupData = [
        {
            id: 1,
            groupName: 'test 2',
            avatarURL:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/182519e8-836e-439e-9053-9fd3c2caacf0',
        },
        {
            id: 3,
            groupName: 'test Group',
            avatarURL: null,
        },
        {
            id: 4,
            groupName: 'test Group',
            avatarURL: null,
        },
        {
            id: 5,
            groupName: 'test Group',
            avatarURL:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/769c16aa-ede8-4865-937f-c8df23c91bca',
        },
        {
            id: 54,
            groupName: 'test',
            avatarURL: null,
        },
    ];

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.groupClient.getJoinedGroup().subscribe((response) => {
            this.joinedGroup = response.data;
            this.isLoading = false;
        });
    }

    handleOpenModal = () => {
        this.isOpenGroupModal = true;
    };

    onSelectGroupModal = (id: number) => {};
}
