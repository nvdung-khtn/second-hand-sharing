import { EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProcessClient } from 'src/app/core/api-clients/process.client';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent implements OnInit, OnChanges {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();
  @Output() message = new EventEmitter<string>();

  isOpenAddressModal = false;
  messageValue: string = '';
  errorMessage: string = '';

  constructor(private processClient: ProcessClient) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.messageValue = '';
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  };

  onClick() {
    if (!this.messageValue) {
      this.errorMessage = 'Vui lòng nhập lời nhắn.';
      return;
    }
    this.modalChange.emit(this.isOpenModal);
    this.message.emit(this.messageValue);
  }

  onInput() {
    this.errorMessage = '';
  }
}
