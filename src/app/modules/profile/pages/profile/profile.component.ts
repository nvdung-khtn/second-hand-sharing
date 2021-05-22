import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, AddressModel } from 'src/app/core/constants/address.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isOpenAddressModal = false;
  displayAddress = '';
  receiveAddress: Address;

  canEdit = false;
  messageAfterSave = '';
  messageColor = 'red';
  form: FormGroup;

  // data from API
  myInfo = {
    id: 3,
    fullName: 'Lê Trường Vĩ',
    dob: '2021-05-02T17:00:00',
    phoneNumber: '904576164',
    avatar: null,
    address: null,
    email: 'nhocpeter1999@gmail.com',
  };

  constructor(private formBuilder: FormBuilder) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // anh call api và thêm các field khác như dob hay địa chỉ vào form và bên file HTML để xử lý
    // do hiện tại em chỉ test flow UI thôi nên ko thêm
    this.form = this.formBuilder.group({
      fullName: [this.myInfo.fullName, Validators.required],
      phoneNumber: [this.myInfo.phoneNumber, Validators.required],
      address: [this.myInfo.address],
  }); }

  onClickEdit = () => {
    this.canEdit = true;
  }
  onClickCancel = () => {
    // khong thay doi
    this.form.setValue({
      fullName: this.myInfo.fullName,
      phoneNumber: this.myInfo.phoneNumber,
      address: this.myInfo.address,
    });
    this.canEdit = false;
  }
  onClickSave = () => {
    // gọi api xử lý tại đây và thay đổi thông tin messageAfterSave
    this.messageAfterSave = 'Thay đổi thông tin cá nhân thành công'; // ví dụ
    this.messageColor = 'green'; // màu của thông báo
    this.canEdit = false;

  }

  openModalAddress = () => {
    this.isOpenAddressModal = true;
  }

  handleAddress = (address: AddressModel) => {
    // em chưa xử lý display address
    console.log(`${address.street} ${address.wardName} ${address.districtName} ${address.cityName}`);
    this.receiveAddress = new Address(address);
  }
}
