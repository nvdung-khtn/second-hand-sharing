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
    availableGroups: Group[] = [];
    joinedGroups: Group[] = [];
    isLoading = false;
    getAllGroupRequest: SearchRequest;

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder) {
        this.getAllGroupRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.groupClient.getAllJoinedGroup(this.getAllGroupRequest).subscribe((response) => {
            this.joinedGroups = response.data;
        });

        this.groupClient.getAllAvailableGroup(this.getAllGroupRequest).subscribe((response) => {
            this.availableGroups = response.data;
        });

        this.isLoading = false;
    }

    handleOpenModal() {
        this.isOpenGroupModal = true;
    }

    onSelectGroupModal(id: number) {}
}
