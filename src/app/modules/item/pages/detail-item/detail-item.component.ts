import { ReceiveStatus } from './../../../../core/constants/receive-request.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { ProcessClient } from 'src/app/core/api-clients/process.client';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';
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
    approvedRequestId: number = -1;
    nomineeName: string;
    toggleApprove = 0;
    selectedUser = {};

    // Define by me
    private userId: number;
    isOwner = true;
    itemId;
    item: Item;
    addressVM: AddressModel;
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
            async (response) => {
                this.item = response.data;
                // Check owner or not?
                if (this.userId !== this.item.donateAccountId) {
                    this.isOwner = false;
                }
                // Get address string
                this.addressVM = await this.addressService.getAddressVMById(
                    response.data.receiveAddress
                );
                this.addressString = this.addressService.getAddressString(this.addressVM);
            },
            (error) => console.log('Error in Item detail: ', error)
        );

        // Get all receive request
        this.homeClient.getAllReceiveRequest(this.itemId).subscribe((response) => {
            this.receiveRequests = response.data;
            // find nominee in the past
            const nominee = this.receiveRequests.find(
                (receiver) => receiver.receiveStatus === ReceiveStatus.APPROVED
            );
            this.approvedRequestId = nominee.id;
            this.nomineeName = nominee.receiverName;
        });
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
                this.processClient.unsubscribeItem(requestId).subscribe(async (response) => {
                    await this.toastr.success('Đã Hủy đăng ký nhận vật phẩm!');
                });
            }
        });
    }

    async handleProcess(requestId, receiverName) {
        if (this.approvedRequestId === -1) {
            this.onApprove(requestId, receiverName);
        } else {
            const flag = this.approvedRequestId;
            await this.onReject(this.approvedRequestId);

            if (requestId != flag) {
                this.onApprove(requestId, receiverName);
            }
        }
    }

    // Xác nhận cho.
    onApprove(requestId: number, receiverName: string) {
        this.processClient.approveReceiver(requestId).subscribe((response) => {
            this.approvedRequestId = requestId;
            this.nomineeName = receiverName;
            this.toastr.success('Đã phê duyệt người nhận.');
        });
    }

    // if (this.approvedRequestId !== requestId) {
    //   this.toggleApprove = 0;
    //   // gọi api approve người dùng mới
    // } else {
    //   this.toggleApprove++;
    // }
    // this.isApproved = requestId;
    // if (this.toggleApprove === 1) {
    //   this.isApproved = -1;
    //   // gọi api hủy
    // }

    async onReject(requestId: number) {
        await Swal.fire({
            title: 'Xác nhận thao tác',
            text: `Hủy bỏ hiệu lực lệnh phê duyệt đăng ký cho ${this.nomineeName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // reject receive request
                // this.processClient.rejectReceiver(requestId).subscribe((response) => {
                //   this.toastr.success(
                //     `Đã hủy lệnh phê duyệt đăng ký cho ${this.nomineeName}`
                //   );
                //   this.approvedRequestId = -1;
                //   this.nomineeName = '';
                // });
                await this.processClient.rejectReceiver(requestId).toPromise();
                this.toastr.success(`Đã hủy lệnh phê duyệt đăng ký cho ${this.nomineeName}`);
                this.approvedRequestId = -1;
                this.nomineeName = '';
            }
        });
    }
}
