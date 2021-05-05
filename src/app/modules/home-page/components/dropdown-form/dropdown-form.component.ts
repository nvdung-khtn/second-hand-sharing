import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AddressModel,
  EnumAddress,
} from 'src/app/core/constants/address.constant';

@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.scss'],
})
export class DropdownFormComponent implements OnInit {
  @Input() inputData;
  @Input() property;
  @Input() dropdownLabel;
  @Output() selectedValue = new EventEmitter<AddressModel>();
  @Output() selectedType = new EventEmitter<EnumAddress>();

  selected: string; // Giá trị đã selected

  constructor() {}

  ngOnInit(): void {}

  onSelect = () => {
    // Emit type of address
    if (this.property === 'cityName') {
      this.selectedType.emit(EnumAddress.CITY);
    }

    if (this.property === 'districtName') {
      this.selectedType.emit(EnumAddress.DISTRICT);
    }

    if (this.property === 'wardName') {
      this.selectedType.emit(EnumAddress.WARD);
    }

    const address = this.inputData.find(
      (item) => item[this.property] === this.selected
    );
    this.selectedValue.emit(address);
  };
}
