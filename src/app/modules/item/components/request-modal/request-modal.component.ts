import { EventEmitter, Output, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProcessClient } from 'src/app/core/api-clients/process.client';
import { Modal, ModalType, ModalStatus } from 'src/app/core/constants/modal.constant';

@Component({
    selector: 'app-request-modal',
    templateUrl: './request-modal.component.html',
    styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent implements OnInit, OnChanges {
    @Input() modalData: Modal;
    @Output() modalChange = new EventEmitter<Modal>();

    messageValue: string = '';
    errorMessage: string = '';
    ModalType: ModalType;

    constructor(private processClient: ProcessClient) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.messageValue = this.modalData.message;
    }

    onClose = () => {
        this.modalData.status = ModalStatus.CLOSE;
        this.modalData.message = '';
        this.modalChange.emit(this.modalData);
    };

    emitModalData() {
        if (!this.messageValue) {
            this.errorMessage = 'Vui lòng nhập lời nhắn.';
            return;
        }
        this.modalData.message = this.messageValue;
        this.modalChange.emit(this.modalData);
    }

    onInput() {
        this.errorMessage = '';
    }
}
