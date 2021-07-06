import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';
import { Item, ItemStatus } from 'src/app/core/constants/item.constant';
import { ReceiveRequest } from 'src/app/core/constants/receive-request.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { EventClient } from 'src/app/core/api-clients/event.client';

@Component({
    selector: 'app-detail-items-event',
    templateUrl: './detail-items-event.component.html',
    styleUrls: ['./detail-items-event.component.scss'],
})
export class DetailItemsEventComponent implements OnInit {
    // assigned member;
    isAccepted = false;

    // user
    userId: number;
    isOwner = false;
    myRole = '';
    isAdmin = true;

    // display accepted by owner
    isSelectedByOwner: boolean = false;

    isProcessing: boolean = false;

    // id;
    groupId;
    eventId;

    // item
    ItemStatus = ItemStatus;
    itemId;
    item: Item;

    // address
    addressString: string;
    addressVM: AddressModel;

    // request
    receiveRequests: ReceiveRequest[];

    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private addressService: AddressService,
        private homeClient: HomeClient,
        private groupClient: GroupClient,
        private authService: AuthService,
        private eventClient: EventClient,
        private toastr: ToastrService,
    ) {
        this.itemId = this._route.snapshot.paramMap.get('itemId');
    }

    ngOnInit() {
        this.isProcessing = true;
        this.eventId = Number(this._route.snapshot.paramMap.get('eventId'));
        this.groupId = Number(this._route.snapshot.paramMap.get('groupId'));
        this.itemId = Number(this._route.snapshot.paramMap.get('itemId'));
        this.userId = this.authService.getUserId();
        // gọi api get detail item cũ
        this.homeClient.getItemById(this.itemId).subscribe(
            async (response) => {
                this.item = response.data;
                // Check owner or not?
                if (this.userId === this.item.donateAccountId) {
                    this.isOwner = true;

                    // Get all receive request
                    this.homeClient.getAllReceiveRequest(this.itemId).subscribe((response) => {
                        this.receiveRequests = response.data;
                    });
                } else {
                    this.isOwner = false;
                }
                // Get address string
                this.addressVM = await this.addressService.getAddressVMById(
                    response.data.receiveAddress
                );
                this.addressString = await this.addressService.getAddressString(this.addressVM);
                this.isProcessing = false;

                if (this.item?.status === ItemStatus.PROCESSING) {
                    this.isAccepted = true;
                }
            },
            (error) => {
                console.log('Error in Item detail: ', error);
                if (error?.error?.Data === null) {
                    this.router.navigateByUrl('/404');
                }
            }
        );
        this.getMyRole(this.groupId, this.userId);
    }

    getMyRole = (groupId: number, userId: number) => {
        this.groupClient.getRoleByUserId(groupId, userId).subscribe(
            (response) => {
                if (response.succeeded) {
                    this.myRole = response.message;
                    if (this.myRole === 'admin') {
                        this.isAdmin = true;
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        );
    };

    onClose() {
        /* const history: any = this.location.getState();
        if (history.navigationId > 1) { this.location.back(); }
        else this.router.navigateByUrl('/home') */
        this.location.back();
    }

    // Xác nhận cho.
    onApprove(requestId: number, receiverName: string) {}

    onAcceptItem = () => {
        this.eventClient.acceptItem(this.eventId, this.itemId).subscribe((response) => {
            this.isAccepted = true;
            this.toastr.success("Đã chấp nhận quyên góp này")
        })
    }

    onDeclineItem = () => {
        this.eventClient.cancelAcceptItem(this.eventId, this.itemId).subscribe((response) => {
            this.isAccepted = false;
            this.toastr.success("Đã hủy chấp nhận quyên góp này")
        })
    }

    onRejectItem = () => {
        this.eventClient.rejectItem(this.eventId, this.itemId).subscribe((response) => {
            this.isAccepted = false;
            this.toastr.success("Đã từ chối nhận vật phẩm này")
            this.router.navigateByUrl(`/group/${this.groupId}/event/${this.eventId}`)
        })
    }

    confirmGiven() {
        this.isProcessing = true;
        this.homeClient.confirmGiven(this.itemId).subscribe(
            (response) => {
                this.item.status = ItemStatus.COMPLETED;
                this.toastr.success('Xác nhận đã cho vật phẩm thành công!');
                setTimeout(() => window.location.reload(), 1500);
            },
            (error) => console.error(error)
        );
    }
}
