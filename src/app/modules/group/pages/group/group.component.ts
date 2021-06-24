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

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.groupClient.getJoinedGroup().subscribe((response) => {
            this.joinedGroup = response.data;
        });
    }

    handleOpenModal() {
        this.isOpenGroupModal = true;
    }

    onNavigateToGroup = (id: number) => {
        console.log(id);
    };
}
