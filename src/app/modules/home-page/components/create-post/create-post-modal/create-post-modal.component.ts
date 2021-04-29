import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadImageService } from 'src/app/shared/service/uploadImage.service';
import { Address } from 'src/app/core/constants/address.constant';
import { HomeClient } from 'src/app/core/api-clients/home.client';
import { CreateItem } from 'src/app/core/constants/item.constant';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModalComponent implements OnInit {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();

  isOpenAddressModal = false;
  url: any[] = [];

  categoryTabBackground = '#f2f2f2';
  categoryIconBackground = '#ffffff';

  userData = {
    name: 'Lê Trường Vĩ',
    address: '147A Nguyễn Thị Minh Khai',
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
    private homeClient: HomeClient
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      itemName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]], // sao ko co thong tin nay
      description: ['', [Validators.required]],
    });
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  };

  onSelectFile = (event) => {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      if (!event.target.files[i] || event.target.files[i].length === 0) { return; }

      const mimeType = event.target.files[i].type;
      if (mimeType.match(/image\/*/) == null) { return; }
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      // tslint:disable-next-line: variable-name
      reader.onload = (_event) => {
        this.url.push(reader.result); };
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  uploadImages(urls) {
    //Reset selectedFiles
    let images = this.selectedFiles;
    this.selectedFiles = null;
    debugger;
    // Upload to cloude
    if (images) {
      const count = images.length;
      console.log(`count: ${count}`);

      for (let index = 0; index < count; index++) {
        this.uploadImageService.uploadSingleImage(urls[index], images[index]).subscribe();
      }
    }
  }

  onRemoveSelectedFile = (index: number) => {
    this.myFiles.splice(index, 1);
    this.url.splice(index, 1);
  };

  onOpenAddressModal = () => {
    this.isOpenAddressModal = true;
  };

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
        debugger;
        // Upload image to cloud
        this.uploadImages(this.preSignUrl);
        alert('thanh cong');
      },
      (error) => console.log(error)
    );
  }

  handleAddress(event) {
    this.receiveAddress = new Address(event);
  }

  handleCategoryId(catId: number) {
    console.log(`catId: ${catId}`);
    this.selectedCatId = catId;
  }
}
