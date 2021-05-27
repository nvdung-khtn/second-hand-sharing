import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { Address, AddressModel } from 'src/app/core/constants/address.constant';
import { Item } from 'src/app/core/constants/item.constant';
import { ReceiveRequest } from 'src/app/core/constants/receive-request.constant';
import { AddressService } from 'src/app/shared/service/address.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
  isOpenModal = false;
  checkMessage = false;
  isOwner = true; // check nếu là người cho
  isApproved = -1;
  toggleApprove = 0;
  selectedUser = {};

  requestListData = [
    {
      id: 2,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 3,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 3,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 4,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 4,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 5,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 5,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 6,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 6,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 7,
      receiverName: 'Lê Trường Vĩ',
    },
    {
      id: 7,
      receiveReason: 'test nhan by le truong vi',
      receiverId: 8,
      receiverName: 'Lê Trường Vĩ',
    },
  ];

  // Define by me
  private itemId;
  public item: Item;
  public addressString: string;
  public receiveRequests: ReceiveRequest[];
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private homeClient: HomeClient,
    private addressService: AddressService
  ) {
    this.itemId = this._route.snapshot.paramMap.get('itemId');
  }

  ngOnInit /*  Nếu là người xin nhận // Đầu tiên check xem là người cho hay người nhận
        call api để check người dùng đã đkí nhận chưa
        nếu rồi thì đổi giá trị của checkMessage = true */ /*  Nếu là người cho
        call api request user list
       check người dùng nào đang dc approve và thay đổi giá trị isApprove và thay đổi thông tin selected User*/() {
    // Get item detail
    this.homeClient.getItemById(this.itemId).subscribe(
      (response) => {
        this.item = response.data;
        this.addressService
          .getAddressString(response.data.receiveAddress)
          .then((data) => (this.addressString = data));
      },
      (error) => console.log('Error in Item detail: ', error)
    );

    // Get all receive request
    this.homeClient
      .getAllReceiveRequest(this.itemId)
      .subscribe((response) => (this.receiveRequests = response.data));
  }

  onClose() {
    this.router.navigateByUrl('/home');
  }

  onClickRegister() {
    this.isOpenModal = true;
  }

  onClickUnregister() {
    // call api huy dang ky
    this.checkMessage = false;
  }

  // flow người cho
  onClickApprove(id: number) {
    if (this.isApproved !== id) {
      this.toggleApprove = 0;
      // gọi api approve người dùng mới
    } else {
      this.toggleApprove++;
    }
    this.isApproved = id;
    if (this.toggleApprove === 1) {
      this.isApproved = -1;
      // gọi api hủy
    }
  }
}
