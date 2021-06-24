import { ReceiveStatus } from './../../../../core/constants/receive-request.constant';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { ProcessClient } from 'src/app/core/api-clients/process.client';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';
import { Item, ItemStatus } from 'src/app/core/constants/item.constant';
import { ReceiveRequest } from 'src/app/core/constants/receive-request.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Modal, ModalType, ModalStatus } from 'src/app/core/constants/modal.constant';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { Location } from '@angular/common';

@Component({
    selector: 'app-detail-item',
    templateUrl: './detail-item.component.html',
    styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
    approvedRequestId: number = -1;
    nomineeName: string;
    userId: number;
    isOwner: boolean = false;
    itemId;
    item: Item;
    addressVM: AddressModel;
    addressString: string;
    receiveRequests: ReceiveRequest[];
    modal: Modal = new Modal(ModalType.REGISTER, '', ModalStatus.CLOSE);
    ItemStatus = ItemStatus;
    ModalType = ModalType;
    ModalStatus = ModalStatus;
    receivedUser: UserInfo;
    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private homeClient: HomeClient,
        private addressService: AddressService,
        private authService: AuthService,
        private processClient: ProcessClient,
        private toastr: ToastrService,
        private location: Location
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
                if (this.userId === this.item.donateAccountId) {
                    this.isOwner = true;

                    // Get all receive request
                    this.homeClient.getAllReceiveRequest(this.itemId).subscribe((response) => {
                        this.receiveRequests = response.data;
                        // find nominee in the past
                        const nominee = this.receiveRequests.find(
                            (receiver) => receiver.receiveStatus === ReceiveStatus.APPROVED
                        );
                        this.approvedRequestId = nominee?.id;
                        this.nomineeName = nominee?.receiverName;
                    });
                }
                // Get address string
                this.addressVM = await this.addressService.getAddressVMById(
                    response.data.receiveAddress
                );
                this.addressString = this.addressService.getAddressString(this.addressVM);
            },
            (error) => {
                console.log('Error in Item detail: ', error);
                if (error?.error?.Data === null) this.router.navigateByUrl('/404')
            }
        );

        // Get received user
        this.homeClient.getReceivedUser(this.itemId).subscribe((response) => {
            this.receivedUser = response.data;
        });
    }

    // Turn off item detail page
    onClose() {
        /* this.router.navigateByUrl('/home'); */
        this.location.back()
    }

    // Open receive register modal
    openInputModal(type) {
        this.modal = {
            ...this.modal,
            status: ModalStatus.OPEN,
            type: type,
            message: '',
        };
    }

    handleModalChange(receivedModal: Modal) {
        if (receivedModal.message) {
            this.modal = receivedModal;
            if (receivedModal.type === ModalType.REGISTER) {
                this.onSubscribe(receivedModal.message);
                return;
            }

            if (receivedModal.type === ModalType.THANKS) {
                this.sendThanksString(receivedModal.message);
            }
        }
    }

    onSubscribe(receiveReason) {
        const formData = {
            itemId: this.itemId,
            receiveReason: receiveReason,
        };

        this.processClient.subscribeItem(formData).subscribe((response: any) => {
            this.item.userRequestId = response.data;
            this.modal.message = response.message;
            this.modal.status = ModalStatus.CLOSE;
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
                this.processClient.unsubscribeItem(requestId).subscribe((response) => {
                    this.item.userRequestId = 0;
                    this.toastr.success('Đã Hủy đăng ký nhận vật phẩm!');
                });
            }
        });
    }

    async handleProcess(requestId, receiverName) {
        if (this.approvedRequestId === -1) {
            this.onApprove(requestId, receiverName);
        } else {
            console.log(this.approvedRequestId)
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

        /** Test success */
        // setTimeout(() => {
        //     console.log('setTimeout func!');
        //     this.onReject(requestId);
        // }, 3000);
    }

    // Hủy yêu cầu.
    async onReject(requestId: number) {
        let result = await Swal.fire({
            title: 'Xác nhận thao tác',
            text: `Hủy bỏ hiệu lực lệnh phê duyệt đăng ký cho ${this.nomineeName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng vậy',
            cancelButtonText: 'Hủy bỏ',
        });

        if (result.isConfirmed) {
            await this.processClient.rejectReceiver(requestId).toPromise();
            this.toastr.success(`Đã hủy lệnh phê duyệt đăng ký cho ${this.nomineeName}`);
            this.approvedRequestId = -1;
            this.nomineeName = '';
        }
    }

    confirmGiven() {
        this.homeClient.confirmGiven(this.itemId).subscribe(
            (response) => {
                this.item.status = ItemStatus.COMPLETED;
                this.toastr.success('Xác nhận đã cho vật phẩm thành công!');
            },
            (error) => console.error(error)
        );
    }

    sendThanksString(thanksMsg) {
        this.processClient
            .sendThanksMessage(this.item.userRequestId, thanksMsg)
            .subscribe((response) => {
                this.toastr.success('Đã gửi lời cảm ơn thành công.');
                this.modal.status = ModalStatus.CLOSE;
            });
    }
}
