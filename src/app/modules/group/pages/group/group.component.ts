import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Group } from 'src/app/core/constants/group.constant';
import { GroupService } from 'src/app/shared/service/group.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: [
        './group.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_button.scss',
    ],
    providers: [GroupService],
})
export class GroupComponent implements OnInit, OnDestroy {
    isOpenGroupModal = false;
    groupForm: FormGroup;
    availableGroups: Group[] = [];
    joinedGroups: Group[] = [];
    isLoading = false;
    getAllGroupRequest: SearchRequest;
    destroy$ = new Subject<void>();

    constructor(
        private readonly groupClient: GroupClient,
        private fb: FormBuilder,
        private groupService: GroupService
    ) {
        this.getAllGroupRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        this.isLoading = true;

        this.groupService.group$
            .pipe(takeUntil(this.destroy$))
            .subscribe((groups) => (this.availableGroups = groups));
        this.groupService.myGroup$
            .pipe(takeUntil(this.destroy$))
            .subscribe((groups) => (this.joinedGroups = groups));

        this.isLoading = false;
    }

    handleOpenModal() {
        this.isOpenGroupModal = true;
    }

    onSelectGroupModal(id: number) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
