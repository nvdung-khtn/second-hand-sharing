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
import { NotificationService } from 'src/app/shared/service/notification.service';
import { Subscription } from 'rxjs';
import { NotifyType } from 'src/app/core/constants/notification.constant';

@Component({
    selector: 'app-detail-item',
    templateUrl: './detail-item.component.html',
    styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
    // real time noti message variable
    realTimeNoti: any;
    subscriptionNoti: Subscription;
    notification: any;
    notiType: string;

    // display accepted by owner
    isSelectedByOwner: boolean = false;

    isProcessing: boolean = false;
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
        private location: Location,
        private notificationService: NotificationService
    ) {
        this.itemId = this._route.snapshot.paramMap.get('itemId');
    }

    ngOnInit() {
        this.isProcessing = true;
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
                        if (nominee?.id !== undefined) {
                            this.approvedRequestId = nominee?.id;
                        }
                        this.nomineeName = nominee?.receiverName;
                    });
                } else {
                    this.processClient
                        .requestStatus(this.item?.userRequestId)
                        .subscribe((response: any) => {
                            if (response.data.receiveStatus === 1) {
                                this.isSelectedByOwner = true;
                            }
                        });
                }
                // Get address string
                this.addressVM = await this.addressService.getAddressVMById(
                    response.data.receiveAddress
                );
                this.addressString = await this.addressService.getAddressString(this.addressVM);
                this.isProcessing = false;
            },
            (error) => {
                console.log('Error in Item detail: ', error);
                if (error?.error?.Data === null) this.router.navigateByUrl('/404');
            }
        );

        // Get received user
        this.homeClient.getReceivedUser(this.itemId).subscribe((response) => {
            this.receivedUser = response.data;
        });

        // Get real time noti
        this.subscriptionNoti = this.notificationService.currentNoti.subscribe((message) => {
            this.realTimeNoti = message;
            this.notification = this.parseNoti(this.realTimeNoti);
            this.notiType = this.parseType(this.realTimeNoti);
            if (this.notiType === NotifyType.RECEIVE_REQUEST + '') {
                this.homeClient.getAllReceiveRequest(this.itemId).subscribe((response) => {
                    this.receiveRequests = response.data;
                    // find nominee in the past
                    const nominee = this.receiveRequests.find(
                        (receiver) => receiver.receiveStatus === ReceiveStatus.APPROVED
                    );
                    if (nominee?.id !== undefined) {
                        this.approvedRequestId = nominee?.id;
                    }
                    this.nomineeName = nominee?.receiverName;
                });
                this.toastr.success(`${this.notification?.receiverName} đã đăng ký nhận vật phẩm`);
            }
            if (this.notiType === NotifyType.CANCEL_RECEIVE_REQUEST + '') {
                const userCancel = this.receiveRequests?.find(
                    (receiver) => receiver.id === this.notification?.requestId
                );

                this.homeClient.getAllReceiveRequest(this.itemId).subscribe((response) => {
                    this.receiveRequests = response.data;
                    // find nominee in the past
                    const nominee = this.receiveRequests.find(
                        (receiver) => receiver.receiveStatus === ReceiveStatus.APPROVED
                    );
                    if (nominee?.id !== undefined) {
                        this.approvedRequestId = nominee?.id;
                    }
                    this.nomineeName = nominee?.receiverName;
                });
                if (userCancel !== undefined) { this.toastr.success(`${userCancel?.receiverName} đã hủy nhận vật phẩm`); }
                this.isProcessing = false;
                this.approvedRequestId = -1;
                this.nomineeName = '';
            }
            if (this.notiType === NotifyType.REQUEST_STATUS + '') {
                if (this.notification?.requestStatus === 1) {
                    this.isSelectedByOwner = true;
                    this.toastr.success(`Yêu cầu của bạn đã được chấp nhận bởi chủ sở hữu`);
                } else {
                    this.isSelectedByOwner = false;
                    this.toastr.success(`Yêu cầu  của bạn đã bị hủy bởi chủ sở hữu`);
                }
            }
            if (this.notiType === NotifyType.CONFIRM_SENT + '') {
                if (this.userId === this.notification?.receiverId) {
                    this.toastr.success(`Chủ sở hữu đã xác nhận tặng vật phẩm cho bạn`);
                } else {
                    this.toastr.success(
                        `Chủ sở hữu đã xác nhận tặng vật phẩm cho ${this.notification?.receiverName}`
                    );
                }
                this.item.status = ItemStatus.COMPLETED;
                setTimeout(() => window.location.reload(), 1500);
            }
            if (this.notiType === NotifyType.SEND_THANKS + '') {
                this.toastr.success(
                    `${this.notification?.sendFromAccountName} đã gửi lời cảm ơn đến bạn với nội dung: "${this.notification?.content}"`
                );
            }
        });
    }

    // Turn off item detail page
    onClose() {
        /* this.router.navigateByUrl('/home'); */
        const history: any = this.location.getState();
        if (history.navigationId > 1) {
            this.location.back();
        } else this.router.navigateByUrl('/home');
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
                    this.isSelectedByOwner = false;
                    this.toastr.success('Đã Hủy đăng ký nhận vật phẩm!');
                });
            }
        });
    }

    async handleProcess(requestId, receiverName) {
        this.isProcessing = true;
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
            this.isProcessing = false;
            this.approvedRequestId = requestId;
            this.nomineeName = receiverName;
            this.toastr.success('Đã phê duyệt người nhận.');
        });
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
            this.isProcessing = false;
            this.toastr.success(`Đã hủy lệnh phê duyệt đăng ký cho ${this.nomineeName}`);
            this.approvedRequestId = -1;
            this.nomineeName = '';
        }
    }

    confirmGiven() {
        this.isProcessing = true;
        this.homeClient.confirmGiven(this.itemId).subscribe(
            (response) => {
                this.isProcessing = false;
                this.item.status = ItemStatus.COMPLETED;
                this.toastr.success('Xác nhận đã cho vật phẩm thành công!');
                setTimeout(() => window.location.reload(), 1500);
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

    parseNoti = (message) => {
        if (message.hasOwnProperty('message')) {
            return JSON.parse(message?.message);
        }
    };

    parseType = (message) => {
        if (message.hasOwnProperty('type')) {
            return message?.type;
        }
    };

    ngOnDestroy() {
        this.subscriptionNoti.unsubscribe();
    }
}
