import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Address,
  AddressModel,
  EnumAddress,
} from 'src/app/core/constants/address.constant';
import { AddressService } from 'src/app/shared/service/address.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent implements OnInit {
  @Input() isOpenModal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();
  @Output() addressData = new EventEmitter<AddressModel>();
  citys: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  selectedType: EnumAddress;

  constructor(private addressService: AddressService) {}

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

  async ngOnInit() {
    // get all city
    this.citys = await this.addressService.getAllCity();
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  };

  onSubmit = () => {
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
    } else {
      this.displayError = true;
    }
  };

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
      this.wards = await this.addressService.getAllWard(
        event.cityId,
        event.districtId
      );
    }

    if (this.selectedType === EnumAddress.WARD) {
      this.addressForm.wardId = event.wardId;
      this.addressForm.wardName = event.wardName;
    }
  }
}
