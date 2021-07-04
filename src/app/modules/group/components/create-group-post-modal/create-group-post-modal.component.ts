import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-create-group-post-modal',
    templateUrl: './create-group-post-modal.component.html',
    styleUrls: [
        './create-group-post-modal.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_input.scss',
        '../../../../../styles/_button.scss',
    ],
})
export class CreateGroupPostModalComponent implements OnInit {
    @Input() groupId: number;
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();

    // image variables
    url: any[] = [];
    myFiles: string[] = [];
    selectedFiles?: FileList = null;

    // post privacy (Visibility)
    privacyList = [
        {
            id: 1, // private
            name: 'Thành viên trong nhóm',
        },
        {
            id: 2, // public
            name: 'Công khai với tất cả mọi người',
        },
    ];

    groupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private groupClient: GroupClient,
        private toastr: ToastrService
    ) {
        this.groupForm = this.fb.group({
            visibility: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        /* console.log(this.groupId) */
    }

    get visibility() {
        return this.groupForm.get('visibility');
    }

    get content() {
        return this.groupForm.get('content');
    }

    onCloseModal() {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    }

    onSubmit() {
        if (this.groupForm.invalid) {
            this.groupForm.markAllAsTouched();
            return;
        }

        // api tạo sự kiện

        /* this.groupClient.createGroup(this.groupForm.getRawValue()).subscribe((response) => {
          this.toastr.success('Tạo group thành công.');
          this.onCloseModal();
          window.location.reload();
      }); */
    }

    showSelectedFile(event) {
        // let event = originalEvent;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < event?.target?.files?.length; i++) {
            this.myFiles.push(event.target.files[i]);
            if (!event.target.files[i] || event.target.files[i].length === 0) {
                return;
            }

            const mimeType = event.target.files[i].type;
            if (mimeType.match(/image\/*/) == null) {
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[i]);
            // tslint:disable-next-line: variable-name
            reader.onload = (_event) => {
                this.url.push(reader.result);
            };
        }
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
        this.showSelectedFile(event);
    }

    onRemoveSelectedFile(index: number) {
        this.myFiles.splice(index, 1);
        this.url.splice(index, 1);
    }

    async onSelectedPrivacy(event) {
        // xử lý chọn assgin member tại đây
        console.log(event.value);
    }
}
