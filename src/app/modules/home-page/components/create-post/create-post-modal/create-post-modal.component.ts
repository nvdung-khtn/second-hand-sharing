import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';
import { Address, AddressModel } from 'src/app/core/constants/address.constant';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { CreateItem } from 'src/app/core/constants/item.constant';
import { AddressService } from 'src/app/shared/service/address.service';
import { UserInfo } from 'src/app/core/constants/user.constant';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModalComponent implements OnInit, OnDestroy {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();

  // biến cho message modal khi gọi xong api đăng bài
  isOpenMessageModal = false;
  isSuccess = true;
  messageModalMessage = '';

  isOpenAddressModal = false;
  url: any[] = [];

  categoryTabBackground = '#f2f2f2';
  categoryIconBackground = '#ffffff';

  currentUser = {
    fullName: '',
    addressString: '',
  };
  myFiles: string[] = [];
  ////////////////////////////////////////////////////////////////
  public postForm!: FormGroup;
  receiveAddress: Address;
  selectedCatId: number;
  preSignUrl: string[] = [];
  selectedFiles?: FileList = null;
  constructor(
    private uploadImageService: UploadImageService,
    private fb: FormBuilder,
    private homeClient: HomeClient,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    console.log('create-post-modal init');
    this.postForm = this.fb.group({
      itemName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]], // sao ko co thong tin nay
      description: ['', [Validators.required]],
    });

    this.getCurrentName();
  }

  // get information of CurrentUser
  getCurrentName() {
    const user: any = JSON.parse(localStorage.getItem('userInfo'));
    const addressString = localStorage.getItem('addressString');
    this.currentUser.fullName = user.fullName;
    this.currentUser.addressString = addressString;
  }

  onClose() {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  }

  showSelectedFile(event) {
    // let event = originalEvent;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
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

  uploadImages = (urls) => {
    // Reset selectedFiles
    const images = this.selectedFiles;
    console.log(this.selectedFiles);
    this.selectedFiles = null;
    /* debugger; */
    // Upload to cloude
    if (images) {
      const count = images.length;
      console.log(`count: ${count}`);

      debugger;
      for (let index = 0; index < count; index++) {
        this.uploadImageService
          .uploadSingleImage(urls[index], images[index])
          .subscribe();
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
    console.log('onSubmitPost: ', this.selectedFiles.length);
    const formData = {
      ...this.postForm.value,
      receiveAddress: this.receiveAddress,
      imageNumber: this.selectedFiles?.length,
      categoryId: this.selectedCatId,
    };
    console.log(formData);
    this.homeClient.createItem(formData).subscribe(
      (response) => {
        response.data.imageUploads.forEach((image) =>
          this.preSignUrl.push(image.presignUrl)
        );
        // Upload image to cloud
        this.uploadImages(this.preSignUrl);
        this.isOpenMessageModal = true;
        this.isSuccess = true;
        this.messageModalMessage = 'Đăng bài thành công';
      },
      (error) => console.log(error)
    );
  }

  handleAddress(address: AddressModel) {
    this.currentUser.addressString =
      this.addressService.convertAddressToAddressString(address);
    this.receiveAddress = new Address(address);
  }

  handleCategoryId(catId: number) {
    console.log(`catId: ${catId}`);
    this.selectedCatId = catId;
  }

  ngOnDestroy() {
    console.log('create-post-model destroy');
  }
}
