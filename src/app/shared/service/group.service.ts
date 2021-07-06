import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Group } from 'src/app/core/constants/group.constant';

@Injectable()
export class GroupService {
    private _groupSubject = new BehaviorSubject<Group[]>([]);
    group$ = this._groupSubject.asObservable();
    private _myGroupSubject = new BehaviorSubject<Group[]>([]);
    myGroup$ = this._myGroupSubject.asObservable();

    constructor(private groupClient: GroupClient, private toastr: ToastrService) {
        this.loadAllGroup();
        this.loadMyGroup();
    }

    // Load groups
    private async loadAllGroup() {
        const groups = await this.groupClient
            .getAllAvailableGroup(new SearchRequest(1, 100))
            .toPromise();

        this._groupSubject.next(groups.data);
    }

    // Load my group
    private async loadMyGroup() {
        const myGroup = await this.groupClient
            .getAllJoinedGroup(new SearchRequest(1, 100))
            .toPromise();

        this._myGroupSubject.next(myGroup.data);
    }

    // Create group
    createGroup(group: Group) {
        const groupState = [...this._groupSubject.getValue(), group];
        this._groupSubject.next(groupState);
        this.updateMyGroupQuantity(group);
        this.toastr.success(`Tạo nhóm ${group.groupName} thành công.`);
    }

    updateMyGroupQuantity(group: Group) {
        const groupState = [...this._myGroupSubject.getValue(), group];
        this._myGroupSubject.next(groupState);
    }
}
