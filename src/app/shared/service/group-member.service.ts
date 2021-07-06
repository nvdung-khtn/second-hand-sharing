// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { GroupClient } from 'src/app/core/api-clients/group.client';
// import { SearchRequest } from 'src/app/core/constants/common.constant';
// import { Group, Group_Member } from 'src/app/core/constants/group.constant';

// @Injectable()
// export class GroupMemberService {
//     private _groupMemberSubject = new BehaviorSubject<Group_Member>(new Group_Member([], [], []));
//     groupMember$ = this._groupMemberSubject.asObservable();

//     constructor(private groupClient: GroupClient, private toastr: ToastrService) {
//         this.loadState();
//     }

//     // Load data
//     private async loadState() {
//         const admin = this.groupClient.getAllAdminByGroupId()
//        Promise.all([])

//         this._groupSubject.next(groups.data);
//     }

//     // Create group
//     createGroup(group: Group) {
//         const groupState = [...this._groupSubject.getValue(), group];
//         this._groupSubject.next(groupState);
//         this.updateMyGroupQuantity(group);
//         this.toastr.success(`Tạo nhóm ${group.groupName} thành công.`);
//     }

//     updateMyGroupQuantity(group: Group) {
//         const groupState = [...this._myGroupSubject.getValue(), group];
//         this._myGroupSubject.next(groupState);
//     }
// }
