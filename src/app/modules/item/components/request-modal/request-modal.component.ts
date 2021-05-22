import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent implements OnInit {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-native
  @Output() message = new EventEmitter<boolean>();

  isOpenAddressModal = false;
  messageValue = '';

  constructor() {}

  ngOnInit(): void {}

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  }

  onClick = () => {
    // call apo
    console.log(this.messageValue);
    if (this.messageValue) {
      this.isOpenModal = false;
      this.modalChange.emit(this.isOpenModal);
      // tslint:disable-next-line: no-unused-expression
      this.messageValue && this.message.emit(true);
    }
  }
}
