import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { ProcessClient } from 'src/app/core/api-clients/process.client';
import { Address, AddressModel } from 'src/app/core/constants/address.constant';
import { Item } from 'src/app/core/constants/item.constant';
import { ReceiveRequest } from 'src/app/core/constants/receive-request.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
  isApproved = -1;
  toggleApprove = 0;
  selectedUser = {};

  // Define by me
  private userId: number;
  isOwner = true;
  itemId;
  item: Item;
  addressString: string;
  receiveRequests: ReceiveRequest[];
  isOpenModal = false;
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private homeClient: HomeClient,
    private addressService: AddressService,
    private authService: AuthService,
    private processClient: ProcessClient,
    private toastr: ToastrService
  ) {
    this.itemId = this._route.snapshot.paramMap.get('itemId');
  }

  ngOnInit() {
    // Get user id
    this.userId = this.authService.getUserId();

    // Get item detail
    this.homeClient.getItemById(this.itemId).subscribe(
      (response) => {
        this.item = response.data;
        // Check owner or not?
        if (this.userId !== this.item.donateAccountId) {
          this.isOwner = false;
        }
        // Get address string
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

  // Open receive register modal
  onClickRegister() {
    this.isOpenModal = true;
  }

  onSubscribe(receiveReason) {
    const formData = {
      itemId: this.itemId,
      receiveReason: receiveReason,
    };

    this.processClient.subscribeItem(formData).subscribe((response: any) => {
      this.item.userRequestId = response.data;
      this.isOpenModal = !this.isOpenModal;
      this.toastr.success('Đăng ký nhận vật phẩm thành công!');
    });
  }

  onUnsubscribe() {
    const requestId = this.item.userRequestId;
    Swal.fire({
      title: 'Xác nhận thao tác',
      text: 'Bạn chắc chắn muốn hủy đăng ký?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đúng vậy',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      // Handle when user want unsubscribeI] item
      if (result.isConfirmed) {
        this.item.userRequestId = 0;
        this.processClient
          .unsubscribeItem(requestId)
          .subscribe(async (response) => {
            await this.toastr.success('Đã Hủy đăng ký nhận vật phẩm!');
          });
      }
    });
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
