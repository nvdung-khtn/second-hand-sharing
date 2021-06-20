import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { UserInfo } from 'src/app/core/constants/user.constant';

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

    constructor(private readonly authClient: AuthClient, private readonly toastr: ToastrService) {}

    ngOnInit() {
        this.authClient.getUserProfile().subscribe((response) => (this.profile = response.data));
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
            this.toastr.success('Cập nhập thành công.');
        });
    }
}
