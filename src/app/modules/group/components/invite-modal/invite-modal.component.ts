import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-invite-modal',
    templateUrl: './invite-modal.component.html',
    styleUrls: ['./invite-modal.component.scss'],
})
export class InviteModalComponent implements OnInit {
    @Input() isOpenModal;
    @Output() modalChange = new EventEmitter<boolean>();
    @Output() emailChange = new EventEmitter<string>();

    email: string = '';
    errorMessage: string = '';

    ngOnInit(): void {}

    onClose = () => {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    };

    onSubmit() {
        this.emailChange.emit(this.email);
    }
}
