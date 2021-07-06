import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Group } from 'src/app/core/constants/group.constant';
import { GroupService } from 'src/app/shared/service/group.service';

import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

    icon = faBullhorn;

    // search event
    searchEvent = '';
    searchEventToChild = '';

    // search group
    searchGroup = '';
    searchGroupToChild = '';

    modelEventChanged: Subject<string> = new Subject<string>();
    modelGroupChanged: Subject<string> = new Subject<string>();

    constructor(private readonly groupClient: GroupClient, private fb: FormBuilder, private groupService: GroupService) {
        this.getAllGroupRequest = new SearchRequest(1, 100);

        // search follow
        this.modelEventChanged
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe((model) => {
                this.searchEventToChild = model;
            });

        this.modelGroupChanged
            .pipe(debounceTime(1000), distinctUntilChanged())
            .subscribe((model) => {
                this.searchGroupToChild = model;
                this.groupClient.getAllSearchAvailableGroup(this.getAllGroupRequest, this.searchGroupToChild).subscribe((response) => {
                    this.availableGroups = response.data;
                });
            });
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
    onSearchEvent = () => {
        this.searchEventToChild = this.searchEvent;
    };

    delayAutoSearchEvent = (text: string) => {
        this.modelEventChanged.next(text);
    };

    onSearchGroup = () => {
        this.searchGroupToChild = this.searchGroup;
        this.groupClient.getAllSearchAvailableGroup(this.getAllGroupRequest, this.searchGroupToChild).subscribe((response) => {
            this.availableGroups = response.data;
        });
    };

    delayAutoSearchGroup = (text: string) => {
        this.modelGroupChanged.next(text);
    };
}
