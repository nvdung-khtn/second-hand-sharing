import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Group } from 'src/app/core/constants/group.constant';

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
    getAllGroupRequest: SearchRequest;

    availableGroups: Group[] = [];

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder) {
        this.getAllGroupRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.groupClient.getJoinedGroup().subscribe((response) => {
            this.joinedGroup = response.data;
            this.isLoading = false;
        });

        this.groupClient.getAllAvailableGroup(this.getAllGroupRequest).subscribe((response) => {
            this.availableGroups = response.data;
        });
    }

    handleOpenModal = () => {
        this.isOpenGroupModal = true;
    };

    onSelectGroupModal = (id: number) => {};
}
