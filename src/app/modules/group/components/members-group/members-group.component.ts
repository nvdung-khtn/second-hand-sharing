// tslint:disable: no-inferrable-types
// tslint:disable: prefer-for-of
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Member } from 'src/app/core/constants/group.constant';

@Component({
    selector: 'app-members-group',
    templateUrl: './members-group.component.html',
    styleUrls: ['./members-group.component.scss'],
})
export class MembersGroupComponent implements OnInit {
    @Input() myRole: string = '';
    @Input() groupId: number = -1;

    isAdmin: boolean = false;
    selectedUser: number = -1;

    memberRequest: SearchRequest;
    admins: Member[] = [];
    members: Member[] = [];
    requestJoins: Member[] = [];

    constructor(private groupClient: GroupClient, private toastr: ToastrService) {
        this.memberRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        // gọi api get member list và get admin
        this.groupClient
            .getAllAdminByGroupId(this.memberRequest, this.groupId)
            .subscribe((response) => {
                this.admins = response.data;
            });

        this.groupClient
            .getAllMemberByGroupId(this.memberRequest, this.groupId)
            .subscribe((response) => {
                this.members = response.data;
            });

        this.groupClient
            .getAllRequestJoin(this.memberRequest, this.groupId)
            .subscribe((response) => {
                this.requestJoins = response.data;
            });
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnChanges(): void {
        if (this.myRole !== '') {
            if (this.myRole === 'admin') {
                this.isAdmin = true;
            }
        }
    }

    onDisplayMenu = (user: any) => {
        if (this.selectedUser === user?.userId) {
            this.selectedUser = -1;
        } else {
            this.selectedUser = user?.userId;
        }
    };

    onKickMember = (user: any) => {
        // gọi api kick member
        console.log('kick: ', user);
    };

    onUpToAdmin = (user: any) => {
        // gọi api thăng quyền admin
        console.log('up to admin:', user);
    };

    onDownToMember = (user: any) => {
        // gọi api xuống quyền thành member
        console.log('down to member:', user);
    };

    approveToJoin(memberId: number) {
        this.groupClient.approveToJoin(this.groupId, memberId).subscribe((response) => {
            this.toastr.success('Phê duyệt yêu cầu thành công');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }

    rejectToJoin(memberId: number) {
        this.groupClient.rejectToJoin(this.groupId, memberId).subscribe((response) => {
            this.toastr.success('Từ chối yêu cầu thành công');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }
}
