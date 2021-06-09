import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-group-modal',
    templateUrl: './create-group-modal.component.html',
    styleUrls: [
        './create-group-modal.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_input.scss',
        '../../../../../styles/_button.scss',
    ],
})
export class CreateGroupModalComponent implements OnInit {
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onClose = () => {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    }
}
