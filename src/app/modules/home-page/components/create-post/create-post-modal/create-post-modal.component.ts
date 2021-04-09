import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();

  isOpenAddressModal = false;
  url: any [] = [];

  categoryTabBackground = '#f2f2f2';
  categoryIconBackground = '#ffffff';

  userData = {
    name: 'Lê Trường Vĩ',
    address: '147A Nguyễn Thị Minh Khai',
  };

  // data of create post
  formData = {
    title: '',
    phone: '',
    description: '',
    address: '', // return data of address modal
  };

  myFiles: string [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  }

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

  onRemoveSelectedFile = (index: number) => {
    this.myFiles.splice(index, 1);
    this.url.splice(index, 1);
  }

  onOpenAddressModal = () => {
    this.isOpenAddressModal = true;
  }

  test = () => {
    console.log(this.formData)
  }

}
