import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';
import { AddressIdModel, AddressModel } from 'src/app/core/constants/address.constant';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { CreateItem } from 'src/app/core/constants/item.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { UserInfo } from 'src/app/core/constants/user.constant';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EventClient } from 'src/app/core/api-clients/event.client';

@Component({
    selector: 'app-create-post-modal',
    templateUrl: './create-post-modal.component.html',
    styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModalComponent implements OnInit, OnDestroy {
    @Input() isOpenModal;
    @Input() isPostItemEvent: boolean = false;
    @Input() eventId: number;
    @Output() modalChange = new EventEmitter<boolean>();

    // biến cho message modal khi gọi xong api đăng bài
    loading = false;
    isOpenMessageModal = false;
    isSuccess = true;
    messageModalMessage = '';

    isOpenAddressModal = false;
    url: any[] = [];

    categoryTabBackground = '#f2f2f2';
    categoryIconBackground = '#ffffff';

    currentUser: UserInfo;
    myFiles: string[] = [];
    ////////////////////////////////////////////////////////////////
    public postForm!: FormGroup;
    receiveAddress: AddressModel;
    selectedCatId: number = 1;
    preSignUrl: string[] = [];
    selectedFiles?: FileList = null;
    destroy$ = new Subject<void>();
    constructor(
        private uploadImageService: UploadImageService,
        private fb: FormBuilder,
        private homeClient: HomeClient,
        private addressService: AddressService,
        private authService: AuthService,
        private eventClient: EventClient
    ) {}

    ngOnInit() {
        this.postForm = this.fb.group({
            itemName: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]], // sao ko co thong tin nay
            description: ['', [Validators.required]],
        });

        this.getCurrentUser();
    }

    getCurrentUser() {
        this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            this.currentUser = user;
            this.receiveAddress = this.currentUser.address;
        });
    }

    onClose() {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
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
        debugger;
        this.selectedFiles = event.target.files;
        this.showSelectedFile(event);
    }

    uploadImages = (urls) => {
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
    };

    onRemoveSelectedFile(index: number) {
        this.myFiles.splice(index, 1);
        this.url.splice(index, 1);
    }

    onOpenAddressModal() {
        this.isOpenAddressModal = true;
    }

    onSubmitPost() {
        if (this.postForm.invalid) {
            return Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Vui lòng điền đầy đủ thông tin trước khi đăng bài.',
            });
        }

        this.loading = true;
        const formData = {
            ...this.postForm.value,
            receiveAddress: this.receiveAddress,
            imageNumber: this.selectedFiles?.length,
            categoryId: this.selectedCatId,
        };

        //Handle donate for events
        if (this.isPostItemEvent) {
            this.eventClient.donateItem(this.eventId, formData).subscribe(
                (response) => {
                    debugger;
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
                        text: 'Quyên góp vật phẩm thành công.',
                    }).then(() => this.onClose());

                    // Reset Data in post
                    this.postForm.reset();
                    this.loading = false;
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
                (error) => {
                    this.loading = false;
                    console.log(error);
                }
            );

            return;
        }

        this.homeClient.createItem(formData).subscribe(
            (response) => {
                this.loading = false;
                response.data.imageUploads.forEach((image) =>
                    this.preSignUrl.push(image.presignUrl)
                );
                // Upload image to cloud
                this.uploadImages(this.preSignUrl);
                this.isSuccess = true;
                // this.isOpenMessageModal = true;
                // this.messageModalMessage = 'Đăng bài thành công';

                Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Đăng bài thành công.',
                }).then(() => this.onClose());

                // Reset Data in post
                this.postForm.reset();
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.log(error);
            }
        );
    }

    handleCategoryId(catId: number) {
        this.selectedCatId = catId;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
