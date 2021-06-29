import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    selectedTab = 1;
    isOpenAddressModal = false;
    displayAddress = '';
    profile: UserInfo;
    status = {
        fullName: false,
        phoneNumber: false,
        dob: false,
    };
    mobileContext = [
        {
            title: 'Đã đăng ký nhận',
            link: 'my-registration',
            id: 1,
        },
        {
            title: 'Bài đẵ đăng',
            link: 'my-donations',
            id: 2,
        },
    ];
    loading = true;
    // phoneNumberPattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    phoneNumberPattern = '[0-9]{10,11}';
    selectedFiles?: FileList = null;
    destroy$ = new Subject<void>();

    constructor(
        private readonly authClient: AuthClient,
        private authService: AuthService,
        private readonly toastr: ToastrService,
        private uploadImageService: UploadImageService,
        private addressService: AddressService
    ) {}

    ngOnInit() {
        this.getUserProfile();
    }

    getUserProfile() {
        this.authClient.getUserProfile().subscribe((response) => {
            this.profile = response.data;
            this.authService.updateCurrentUser(this.profile);
            this.loading = false;
        });
    }

    toggleModalAddress() {
        this.isOpenAddressModal = !this.isOpenAddressModal;
    }

    handleAddress(event) {
        this.profile.address = event;
        localStorage.setItem(
            'addressString',
            this.addressService.getAddressString(this.profile.address)
        );
        this.updateUserProfile(true);
    }

    toggleStatus(key) {
        if (key === true) return;
        this.status[`${key}`] = !this.status[`${key}`];
    }

    updateUserProfile(key) {
        if (key === 'dob') {
            const tmp = new Date(this.profile.dob).getTime() + 86400000;
            this.profile.dob = new Date(tmp);
        }

        this.authClient.patchUserProfile(this.profile).subscribe((response) => {
            this.toggleStatus(key);
            this.getUserProfile();
            this.toastr.success('Cập nhập thành công.');
        });
    }

    // After submit form
    selectFile(event: any): void {
        const image: FileList = event.target.files;
        if (image) {
            this.authClient.updateAvatar().subscribe((response) => {
                const presignUrl = response.data.imageUploads.presignUrl;
                this.uploadImageService
                    .uploadSingleImage(presignUrl, image[0])
                    .subscribe(async (response) => {
                        await this.getUserProfile();
                        this.toastr.success('Cập nhập ảnh đại diện thành công.');
                    });
            });
        }
    }

    isSelectedTab(id: number) {
        this.selectedTab = id;
    }

    updateUserAddress(event) {
        this.profile.address = event;
        this.updateUserProfile(true);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
