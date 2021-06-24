import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

    constructor(
        private readonly authClient: AuthClient,
        private readonly toastr: ToastrService,
        private uploadImageService: UploadImageService
    ) {}

    ngOnInit() {
        this.getUserProfile();
    }

    getUserProfile() {
        this.authClient.getUserProfile().subscribe((response) => {
            this.profile = response.data;
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            this.loading = false;
        });
    }

    toggleModalAddress() {
        this.isOpenAddressModal = !this.isOpenAddressModal;
    }

    handleAddress(event) {
        this.profile.address = event;
        this.updateUserProfile(true);
    }

    toggleStatus(key) {
        if (key === true) return;
        this.status[`${key}`] = !this.status[`${key}`];
    }

    updateUserProfile(key) {
        this.authClient.patchUserProfile(this.profile).subscribe((response) => {
            this.toggleStatus(key);
            this.getUserProfile();
            this.toastr.success('Cập nhập thành công.');
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            window.location.reload();
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
}
