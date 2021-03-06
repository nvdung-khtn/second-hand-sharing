// tslint:disable: no-inferrable-types
// tslint:disable: prefer-for-of
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchRequest } from 'src/app/core/constants/common.constant';
import { Member } from 'src/app/core/constants/group.constant';
import { NotificationService } from 'src/app/shared/service/notification.service';
import Swal from 'sweetalert2';
import { NotifyType } from 'src/app/core/constants/notification.constant';
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
    admins: Member[];
    members: Member[];
    requestJoins: Member[];

    // noti
    subscriptionNoti: Subscription;
    realTimeNoti: any;
    notification: any;
    notiType: string;

    constructor(
        private groupClient: GroupClient,
        private toastr: ToastrService,
        private notificationService: NotificationService
    ) {
        this.memberRequest = new SearchRequest(1, 100);
    }

    ngOnInit(): void {
        this.subscriptionNoti = this.notificationService.currentNoti.subscribe((message: any) => {
            this.realTimeNoti = message;
            this.notification = this.parseNoti(this.realTimeNoti);
            this.notiType = this.parseType(this.realTimeNoti);
            if (this.notification?.groupId === this.groupId) {
                if (this.notiType === NotifyType.JOIN_REQUEST + '') {
                    this.groupClient
                        .getAllRequestJoin(this.memberRequest, this.groupId)
                        .subscribe((response) => {
                            this.requestJoins = response.data;
                        });
                }
                if (this.notiType === NotifyType.ACCEPT_INVITATION + '') {
                    this.groupClient
                        .getAllMemberByGroupId(this.memberRequest, this.groupId)
                        .subscribe((response) => {
                            this.members = response.data;
                        });
                }
            }
        });

        // g???i api get member list v?? get admin
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

    async kickOutMember(memberId: number) {
        let result = await Swal.fire({
            title: 'X??c nh???n thao t??c',
            text: `B???n th???c s??? mu???n x??a th??nh vi??n n??y kh???i nh??m`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '????ng v???y',
            cancelButtonText: 'H???y b???',
        });

        if (result.isConfirmed) {
            this.groupClient.kickOutMember(this.groupId, memberId).subscribe((response) => {
                this.groupClient
                    .getAllMemberByGroupId(this.memberRequest, this.groupId)
                    .subscribe((response) => {
                        this.members = response.data;
                    });
                this.selectedUser = -1;
                this.toastr.success('X??a b??? th??nh vi??n th??nh c??ng');
            });
        }
    }

    async onUpToAdmin(memberId: number) {
        let result = await Swal.fire({
            title: 'X??c nh???n thao t??c',
            text: `B???n ch???c ch???n mu???n th??ng c???p cho ng?????i n??y`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '????ng v???y',
            cancelButtonText: 'H???y b???',
        });

        if (result.isConfirmed) {
            this.groupClient.promoteMember(this.groupId, memberId).subscribe((response) => {
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

                this.selectedUser = -1;
                this.toastr.success('Th??ng c???p th??nh c??ng');
            });
        }
    }

    onDownToMember = (user: any) => {
        // g???i api xu???ng quy???n th??nh member
        console.log('down to member:', user);
    };

    approveToJoin(memberId: number) {
        this.groupClient.approveToJoin(this.groupId, memberId).subscribe((response) => {
            let newMember: Member;
            // // C???n check l???i
            // this.requestJoins = this.requestJoins.map((user) => {
            //     if (user.requesterId === memberId) {
            //         newMember = user;
            //         return;
            //     }

            //     return user;
            // });
            // this.members = [...this.members, newMember];

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

            this.toastr.success('Ph?? duy???t y??u c???u th??nh c??ng');
        });
    }

    rejectToJoin(memberId: number) {
        this.groupClient.rejectToJoin(this.groupId, memberId).subscribe((response) => {
            this.groupClient
                .getAllRequestJoin(this.memberRequest, this.groupId)
                .subscribe((response) => {
                    this.requestJoins = response.data;
                });

            this.toastr.success('T??? ch???i y??u c???u th??nh c??ng');
        });
    }
    parseNoti = (message) => {
        if (message.hasOwnProperty('message')) {
            return JSON.parse(message?.message);
        }
    };

    parseType = (message) => {
        if (message.hasOwnProperty('type')) {
            return message?.type;
        }
    };
}
