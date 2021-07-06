import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GroupPostClient } from 'src/app/core/api-clients/group-post.client';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';
import Swal from 'sweetalert2';

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

    loading = false;
    preSignUrl: string[] = [];
    isSuccess = true;

    groupForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private groupPostClient: GroupPostClient,
        private toastr: ToastrService,
        private uploadImageService: UploadImageService
    ) {
        this.groupForm = this.fb.group({
            visibility: [1, [Validators.required]],
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
        this.groupForm.reset();
    }

    onSubmit() {
        if (this.groupForm.invalid) {
            this.groupForm.markAllAsTouched();
            return;
        }

        const formData = {
            ...this.groupForm.value,
            imageNumber: this.selectedFiles?.length,
            groupId: this.groupId,
        };

        this.loading = true;
        this.groupPostClient.createPost(formData).subscribe(
            (response) => {
                this.loading = false;
                response.data.imageUploads.forEach((image) =>
                    this.preSignUrl.push(image.presignUrl)
                );
                // Upload image to cloud
                this.uploadImages(this.preSignUrl);
                this.isSuccess = true;

                Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Đăng bài thành công.',
                }).then(() => this.onCloseModal());

                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.log(error);
            }
        );
    }

    uploadImages(urls) {
        // Reset selectedFiles
        const images = this.selectedFiles;
        this.selectedFiles = null;
        // Upload to cloude
        if (images) {
            const count = images.length;

            for (let index = 0; index < count; index++) {
                this.uploadImageService.uploadSingleImage(urls[index], images[index]).subscribe();
            }
        }
    }

    showSelectedFile(event) {
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
