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
    isOpenAddressModal = false;
    displayAddress = '';
    profile: UserInfo;
    status = {
        fullName: false,
        phoneNumber: false,
        dob: false,
    };
    //phoneNumberPattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
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
        });
    }

    toggleModalAddress() {
        this.isOpenAddressModal = !this.isOpenAddressModal;
    }

    handleAddress(event) {
        this.profile.address = event;
        console.log(this.profile.address);
    }

    toggleStatus(key) {
        this.status[`${key}`] = !this.status[`${key}`];
    }

    updateUserProfile(key) {
        console.log(this.profile);
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
}
