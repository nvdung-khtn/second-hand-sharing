import { ReceiveStatus } from 'src/app/core/constants/receive-request.constant';
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
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-detail-items-event',
    templateUrl: './detail-items-event.component.html',
    styleUrls: ['./detail-items-event.component.scss'],
})
export class DetailItemsEventComponent implements OnInit {
    // assigned member;
    assignedMember: any;
    /* assignedMember: any = {fullName: "Lê Trường Vĩ"} */

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

    // member list show for admin
    memberGroupList = [
        {
            userId: 4,
            fullName: 'Do Thi Kim Ngan',
            joinDate: '2021-06-29T11:42:49.176842',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/769c16aa-ede8-4865-937f-c8df23c91bca',
        },
        {
            userId: 1,
            fullName: 'Lê Mậu Toàn',
            joinDate: '2021-06-29T11:42:52.743481',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/34115965-f193-449e-a522-b26a7b7a2538',
        },
        {
            userId: 5,
            fullName: 'Ngan',
            joinDate: '2021-06-29T11:42:55.746793',
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
        },
    ];

    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private addressService: AddressService,
        private homeClient: HomeClient,
        private groupClient: GroupClient,
        private authService: AuthService
    ) {
        this.itemId = this._route.snapshot.paramMap.get('itemId');
    }

    ngOnInit() {
        this.isProcessing = true;
        this.eventId = Number(this._route.snapshot.paramMap.get('eventId'));
        this.groupId = Number(this._route.snapshot.paramMap.get('groupId'));

        this.userId = this.authService.getUserId();
        // gọi api get detail item cũ
        this.item = {
            id: 88,
            itemName: 'test donate event 2 lan 2',
            receiveAddress: {
                street: '123 street',
                wardId: 14,
                districtId: 9,
                cityId: 15,
            },
            postTime: '2021-06-29T11:14:49.460771',
            description: 'test donate item for group 3',
            imageUrl: [
                'https://storage.googleapis.com/secondhandsharing.appspot.com/906e2ab1-0f92-44ee-974c-f45d0fffe023',
            ],
            donateAccountId: 5,
            donateAccountName: 'Ngan',
            userRequestId: 0,
            status: 0,
            avatarUrl:
                'https://storage.googleapis.com/secondhandsharing.appspot.com/abbb30a9-0407-4385-83e0-6af689fb93e0',
        };
        // Get address string
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
                    /* this.processClient
                        .requestStatus(this.item?.userRequestId)
                        .subscribe((response: any) => {
                            if (response.data.receiveStatus === 1) {
                                this.isSelectedByOwner = true;
                            }
                        }); */
                    console.log('not owner');
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
        const history: any = this.location.getState();
        if (history.navigationId > 1) { this.location.back(); }
        else this.router.navigateByUrl('/home')
    }

    onSubscribe(receiveReason) {}

    // Xác nhận cho.
    onApprove(requestId: number, receiverName: string) {}

    async onSelectedDropdown(event) {
        // xử lý chọn assgin member tại đây
        console.log(event.value);
    }
}
