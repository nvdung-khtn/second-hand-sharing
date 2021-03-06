import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { map, pluck, takeUntil } from 'rxjs/operators';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { Group, MemberJoinStatus } from 'src/app/core/constants/group.constant';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';
import Swal from 'sweetalert2';
import { NotifyType } from 'src/app/core/constants/notification.constant';
import {Location} from '@angular/common'; 

@Component({
    selector: 'app-detail-group',
    templateUrl: './detail-group.component.html',
    styleUrls: ['./detail-group.component.scss', '../../../../../styles/_button.scss'],
})
export class DetailGroupComponent implements OnInit, OnDestroy {
    tabContext = [
        {
            id: 1,
            name: 'Giới thiệu',
        },
        {
            id: 2,
            name: 'Thảo luận',
        },
        {
            id: 3,
            name: 'Sự kiện',
        },
        {
            id: 4,
            name: 'Thành viên',
        },
    ];

    selectedTab = 1;
    groupId: number;
    isMember: boolean = false;
    myRole = '';
    groupDetail: Group;
    openInviteModal = false;
    currentUser: UserInfo;

    // join status
    joinStatus: MemberJoinStatus;
    MemberJoinStatus = MemberJoinStatus;

    // noti
    subscriptionNoti: Subscription;
    realTimeNoti: any;
    notification: any;
    notiType: string;

    destroy$ = new Subject<void>();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupClient: GroupClient,
        private authService: AuthService,
        private toastr: ToastrService,
        private uploadImageService: UploadImageService,
        private notificationService: NotificationService,
        private location: Location
    ) {}

    ngOnInit() {
        this.getCurrentUser();
        this.route.paramMap
            .pipe(map((params) => +params.get('id')))
            .subscribe((id) => (this.groupId = +id));
        this.selectedTab = Number(this.route.snapshot.paramMap.get('tabId') || 1);
        if (this.selectedTab <= 0 || this.selectedTab > 4 || isNaN(this.selectedTab)) {
            this.router.navigateByUrl('/404');
        }
        this.loadData();

        this.subscriptionNoti = this.notificationService.currentNoti.subscribe((message: any) => {
            this.realTimeNoti = message;
            this.notification = this.parseNoti(this.realTimeNoti);
            this.notiType = this.parseType(this.realTimeNoti);
            if (this.notification?.groupId === this.groupId) {
                if (this.notiType === NotifyType.INVITE_MEMBER + '') {
                    this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
                        this.joinStatus = response.data;
                    });
                    this.toastr.success(
                        `Bạn nhận được yêu cầu tham gia vào nhóm ${this.notification?.groupName}`
                    );
                }
                if (this.notiType === NotifyType.ACCEPT_INVITATION + '') {
                    this.toastr.success(
                        `${this.notification?.fullName} đã chấp nhận yêu cầu tham gia vào nhóm này`
                    );
                }
                if (this.notiType === NotifyType.JOIN_REQUEST + '') {
                    this.toastr.success(
                        `${this.notification?.fullName} đã gửi yêu cầu tham gia vào nhóm này`
                    );
                }
            }
        });
    }

    loadData() {
        this.groupClient.getGroupDetailById(this.groupId).subscribe(
            (response) => (this.groupDetail = response.data),
            (error) => {
                this.router.navigateByUrl('/404');
            }
        );

        this.getMyRole(this.groupId, this.currentUser.id);
        this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
            this.joinStatus = response.data;
        });
    }

    getCurrentUser() {
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            this.currentUser = user;
        });
    }

    // Error 400 khi user không phải là member
    getMyRole(groupId: number, userId: number) {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                if (response.succeeded) {
                    this.myRole = response.message;
                    this.isMember = true;
                    /* this.selectedTab = 2; */
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onSelectTab(id: number) {
        this.selectedTab = id;
        this.location.replaceState(`/group/${this.groupId}/${this.selectedTab}`)
    }

    selectFile(event: any): void {
        const image: FileList = event.target.files;
        if (image) {
            this.groupClient.updateAvatar(this.groupId).subscribe((response) => {
                const presignUrl = response.data.imageUploads.presignUrl;
                this.uploadImageService
                    .uploadSingleImage(presignUrl, image[0])
                    .subscribe(async (response) => {
                        await this.loadData();
                        this.toastr.success('Cập nhập ảnh đại diện thành công.');
                    });
            });
        }
    }

    onInvite() {
        this.openInviteModal = true;
    }

    async onClickJoin() {
        let result = await Swal.fire({
            title: 'Xác Nhận',
            text: `Bạn muốn tham gia nhóm ${this.groupDetail.groupName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            await this.groupClient.joinGroup(this.groupId).toPromise();
            this.toastr.success(`Đã gửi yêu cầu tới quản trị viên.`);
            this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
                this.joinStatus = response.data;
            });
        }
    }

    async onClickCancelJoin() {
        let result = await Swal.fire({
            title: 'Xác Nhận',
            text: `Bạn muốn hủy yêu cầu tham gia nhóm ${this.groupDetail.groupName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            await this.groupClient.cancelJoinGroup(this.groupId).toPromise();
            this.toastr.success(`Hủy yêu cầu tham gia nhóm thành công`);
            this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
                this.joinStatus = response.data;
            });
        }
    }

    onAcceptInvite() {
        this.groupClient.acceptInvitation(this.groupId).subscribe((response) => {
            this.getMyRole(this.groupId, this.currentUser.id);
            this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
                this.joinStatus = response.data;
            });
            this.toastr.success('Đã chấp nhận lời mời.');
        });
    }

    onDeclineInvite() {
        this.groupClient.declineInvitation(this.groupId).subscribe((response) => {
            this.groupClient.getJoinStatus(this.groupId).subscribe((response) => {
                this.joinStatus = response.data;
            });
            this.toastr.success('Đã từ chối lời mời.');
        });
    }

    async onLeave() {
        let result = await Swal.fire({
            title: 'Xác nhận thao tác',
            text: `Bạn thật sự muốn thoát khỏi nhóm`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            this.groupClient.leaveGroup(this.groupId).subscribe(
                (response) => {
                    this.toastr.success(`Thoát khỏi nhóm thành công`);
                    setTimeout(() => window.location.reload(), 1500);
                },
                (error) => {
                    console.log(error);
                    this.toastr.error(`Thoát khỏi nhóm thất bại`);
                }
            );
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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
