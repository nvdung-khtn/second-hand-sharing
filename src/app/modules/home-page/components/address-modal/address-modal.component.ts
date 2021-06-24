import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressIdModel, AddressModel, EnumAddress } from 'src/app/core/constants/address.constant';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
    selector: 'app-address-modal',
    templateUrl: './address-modal.component.html',
    styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit, OnDestroy {
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();
    @Output() addressData = new EventEmitter<AddressModel>();
    citys: any[] = [];
    districts: any[] = [];
    wards: any[] = [];
    selectedType: EnumAddress;
    myAddressArray: any;
    currentUser: UserInfo;

    constructor(private addressService: AddressService, private authService: AuthService) {}

    addressForm: AddressModel = {
        cityId: -1,
        cityName: '',
        districtId: -1,
        districtName: '',
        wardId: -1,
        wardName: '',
        street: '',
    };

    displayError = false;
    destroy$ = new Subject<void>();

    async ngOnInit() {
        // get all city
        this.citys = await this.addressService.getAllCity();
        this.getCurrentUser();
        const user: any = JSON.parse(localStorage.getItem('userInfo'));
        this.myAddressArray = user.address;
    }

    getCurrentUser() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe((user) => (this.currentUser = user));
    }

    onClose() {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    }

    onSubmit() {
        if (
            this.addressForm.cityId !== -1 &&
            this.addressForm.districtId !== -1 &&
            this.addressForm.wardId !== -1 &&
            this.addressForm.street
        ) {
            this.isOpenModal = false;
            this.displayError = false;
            this.addressData.emit(this.addressForm);
            this.modalChange.emit(this.isOpenModal);
            this.currentUser = { ...this.currentUser, address: this.addressForm };
            this.authService.updateCurrentUser(this.currentUser);
        } else {
            this.displayError = true;
        }
    }

    async handleSelectedAddress(event: AddressModel) {
        if (this.selectedType === EnumAddress.CITY) {
            this.addressForm.cityId = event.cityId;
            this.addressForm.cityName = event.cityName;

            // When have cityId => get district
            this.districts = await this.addressService.getAllDistrict(event.cityId);
        }
        if (this.selectedType === EnumAddress.DISTRICT) {
            this.addressForm.districtId = event.districtId;
            this.addressForm.districtName = event.districtName;

            // When have districtId => get ward
            this.wards = await this.addressService.getAllWard(event.cityId, event.districtId);
        }

        if (this.selectedType === EnumAddress.WARD) {
            this.addressForm.wardId = event.wardId;
            this.addressForm.wardName = event.wardName;
        }
    }

    onClickMyAddress = () => {
        this.isOpenModal = false;
        this.displayError = false;
        this.addressData.emit(this.myAddressArray);
        this.modalChange.emit(this.isOpenModal);
    };

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
