// tslint:disable: no-inferrable-types
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GroupClient } from 'src/app/core/api-clients/group.client';

@Component({
    selector: 'app-create-event-modal',
    templateUrl: './create-event-modal.component.html',
    styleUrls: [
        './create-event-modal.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_input.scss',
        '../../../../../styles/_button.scss',
    ],
})
export class CreateEventModalComponent implements OnInit {
    @Input() groupId: number;
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();

    groupForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private groupClient: GroupClient,
        private toastr: ToastrService
    ) {
        this.groupForm = this.fb.group({
            eventName: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {console.log(this.groupId)}

    get eventName() {
        return this.groupForm.get('eventName');
    }

    get startDate() {
        return this.groupForm.get('startDate');
    }

    get endDate() {
        return this.groupForm.get('endDate');
    }


    get content() {
        return this.groupForm.get('content');
    }

    onCloseModal() {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    }

    onSubmit() {
        if (this.groupForm.invalid) {
            this.groupForm.markAllAsTouched();
            return;
        }

        // api tạo sự kiện

        /* this.groupClient.createGroup(this.groupForm.getRawValue()).subscribe((response) => {
            this.toastr.success('Tạo group thành công.');
            this.onCloseModal();
            window.location.reload();
        }); */
    }
}
