import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})
export class RequestModalComponent implements OnInit {
  @Input() isOpenModal;
  @Output() modalChange = new EventEmitter<boolean>();

  isOpenAddressModal = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClose = () => {
    this.isOpenModal = false;
    this.modalChange.emit(this.isOpenModal);
  }
}
