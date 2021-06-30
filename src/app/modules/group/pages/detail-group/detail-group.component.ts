import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from 'src/app/shared/service/auth.service';
import Swal from 'sweetalert2';

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
            name: 'Sự kiện',
        },
        {
            id: 3,
            name: 'Thành viên',
        },
    ];

    selectedTab = 1;
    groupId: number;
    isMember: boolean = false;
    myRole = '';
    groupDetail: any;
    openInviteModal = false;
    currentUser: UserInfo;

    destroy$ = new Subject<void>();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private groupClient: GroupClient,
        private authService: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getCurrentUser();
        this.groupId = Number(this.route.snapshot.paramMap.get('id'));
        this.getMyRole(this.groupId, this.currentUser.id);
        this.getGroupInfo(this.groupId);
    }

    getCurrentUser() {
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            this.currentUser = user;
        });
    }

    getMyRole(groupId: number, userId: number) {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                if (response.succeeded) {
                    this.myRole = response.message;
                    this.isMember = true;
                    this.selectedTab = 2;
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    getGroupInfo(groupId: number) {
        this.groupClient.getGroupDetailById(this.groupId).subscribe((response) => {
            this.groupDetail = response.data;
        });
    }

    onSelectTab(id: number) {
        this.selectedTab = id;
    }

    selectFile(event: any): void {
        const image: FileList = event.target.files;
        if (image) {
            // api update group avatar
        }
    }

    onInvite() {
        this.openInviteModal = true;
    }

    async onClickJoin() {
        let result = await Swal.fire({
            title: 'Xác Nhận',
            text: `Bạn muốn tham gia group này`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            this.groupClient.joinGroup(this.groupId).subscribe((response) => {
                this.toastr.success(`Đã gửi yêu cầu tới quản trị viên.`);
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
