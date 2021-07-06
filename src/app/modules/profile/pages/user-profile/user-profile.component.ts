import { Component, Input, OnInit } from '@angular/core';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss', '../../../../../styles/_box.scss'],
})
export class UserProfileComponent implements OnInit {
    selectedTab = 1;

    userId: number;
    sOpenAddressModal = false;
    displayAddress = '';
    profile: UserInfo;
    phoneNumberPattern = '[0-9]{10,11}';
    selectedFiles?: FileList = null;
    loading = true;

    openMessageBox = false;
    messageBoxByUser;
    message;

    mobileContext = [
        {
            title: 'Đã đăng ký nhận',
            link: 'my-registration',
            id: 1,
        },
        {
            title: 'Bài đã đăng',
            link: 'my-donations',
            id: 2,
        },
    ];

    constructor(
        private readonly authClient: AuthClient,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    // tslint:disable-next-line: typedef
    ngOnInit() {
        this.userId = Number(this.route.snapshot.paramMap.get('id'));
        this.getUserProfile(this.userId);
    }

    getUserProfile = (userId: number) => {
        this.authClient.getUserById(userId).subscribe(
            (response) => {
                this.profile = response.data;
                this.loading = false;
            },
            (error) => {
                if (error?.error?.Data === null) {
                    this.router.navigateByUrl('/404');
                }
            }
        );
    };
    onClose = () => {
        /* const history: any = this.location.getState();
        if (history.navigationId > 1) {
            this.location.back();
        } else this.router.navigateByUrl('/home'); */
        this.location.back();
    };

    isSelectedTab(id: number) {
        this.selectedTab = id;
    }
}
