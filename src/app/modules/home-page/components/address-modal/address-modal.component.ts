import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
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
export class AddressModalComponent implements OnInit, OnChanges {
    @Input() openAddressModal: boolean;
    @Output() openAddressModalChange = new EventEmitter<boolean>();
    @Input() addressData: AddressIdModel;
    @Output() addressDataChange = new EventEmitter<AddressIdModel>();

    citys: any[] = [];
    districts: any[] = [];
    wards: any[] = [];
    selectedType = EnumAddress;
    currentUser: UserInfo;
    displayError = false;

    constructor(private addressService: AddressService, private authService: AuthService) {}

    ngOnInit(): void {}

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        await this.initializeAddress();
    }

    async initializeAddress() {
        if (this.addressData) {
            Promise.all([
                this.addressService.getAllCity(),
                this.addressService.getAllDistrict(this.addressData.cityId),
                this.addressService.getAllWard(
                    this.addressData.cityId,
                    this.addressData.districtId
                ),
            ]).then((value) => {
                this.citys = value[0];
                this.districts = value[1];
                this.wards = value[2];
            });
        } else {
            this.citys = await this.addressService.getAllCity();
        }
    }

    closeAddressModal() {
        this.openAddressModal = false;
        this.openAddressModalChange.emit(this.openAddressModal);
    }

    onSubmit() {
        if (
            this.addressData.cityId &&
            this.addressData.districtId &&
            this.addressData.wardId &&
            this.addressData.street
        ) {
            this.displayError = false;
            this.addressData = { ...this.addressData };
            this.addressDataChange.emit(this.addressData);
            this.closeAddressModal();
        } else {
            this.displayError = true;
        }
    }

    async onSelected(fieldName, event) {
        if (fieldName === this.selectedType.CITY) {
            this.wards = [];
            this.addressData.street = '';
            this.districts = await this.addressService.getAllDistrict(event.value);
            return (this.addressData.cityId = event.value);
        }

        if (fieldName === this.selectedType.DISTRICT) {
            this.wards = await this.addressService.getAllWard(this.addressData.cityId, event.value);
            return (this.addressData.districtId = event.value);
        }

        if (fieldName === this.selectedType.WARD) {
            return (this.addressData.wardId = event.value);
        }
    }
}
