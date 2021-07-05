import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { SearchUser } from 'src/app/core/constants/user.constant';

@Component({
    selector: 'app-invite-modal',
    templateUrl: './invite-modal.component.html',
    styleUrls: ['./invite-modal.component.scss'],
})
export class InviteModalComponent implements OnInit {
    @Input() groupId: number;
    @Input() isOpenModal;
    @Output() modalChange = new EventEmitter<boolean>();
    @Output() emailChange = new EventEmitter<string>();

    errorMessage: string = '';

    // for search box
    keyword = 'fullName';
    placeholder = 'Nhập tên người dùng hoặc số điện thoại';
    isLoading = false;
    notFoundUser = 'Không tìm thấy người dùng trên hệ thống';

    // selected user
    selectedUser: SearchUser = {
        id: -1,
        fullName: '',
        avatarUrl: '',
    };

    // search string
    searchResponse = [];

    constructor(private authClient: AuthClient, private toastr: ToastrService, private groupClient: GroupClient) {}

    ngOnInit(): void {
        this.selectedUser = {
            id: -1,
            fullName: '',
            avatarUrl: '',
        };
        this.searchResponse = [];
    }

    ngOnChanges(): void {
        this.selectedUser = {
            id: -1,
            fullName: '',
            avatarUrl: '',
        };
        this.searchResponse = [];
    }

    onClose = () => {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    };

    selectEvent(item) {
        this.selectedUser = item;
    }

    onChangeSearch = async (val: string) => {
        this.isLoading = true;
        this.authClient.searchUser(val).subscribe((response) => {
            this.searchResponse = response?.data;
            this.isLoading = false;
        }, (error) => {
            console.log(error);
            this.isLoading = false;
        })
    }

    onClearSearch = () => {
        this.selectedUser = {
            id: -1,
            fullName: '',
            avatarUrl: '',
        };
        this.searchResponse = []
    }

    onSubmit() {
        // gọi api mời
        if (this.selectedUser?.id === -1) {
            this.toastr.error('Vui lòng tìm và chọn người dùng muốn mời');
        }
        this.groupClient.inviteMember(this.groupId, this.selectedUser?.id).subscribe((response) => {
            this.toastr.success('Mời thành viên thành công.');
            this.onClose();
        }, (error) => {
            console.log(error);
            this.toastr.error('Thành viên đã có trong nhóm hoặc đã được mời trước đó');
        })
    }

    onCustomFilter = (items: any[], query: string) => {
        return items;
    }
}
