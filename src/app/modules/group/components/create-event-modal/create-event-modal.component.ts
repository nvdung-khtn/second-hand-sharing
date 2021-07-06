// tslint:disable: no-inferrable-types
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { EventClient } from 'src/app/core/api-clients/event.client';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/service/format-datepicker.service';

@Component({
    selector: 'app-create-event-modal',
    templateUrl: './create-event-modal.component.html',
    styleUrls: [
        './create-event-modal.component.scss',
        '../../../../../styles/_box.scss',
        '../../../../../styles/_input.scss',
        '../../../../../styles/_button.scss',
    ],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ],
})
export class CreateEventModalComponent implements OnInit {
    @Input() groupId: number;
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();

    eventForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private eventClient: EventClient,
        private toastr: ToastrService
    ) {
        this.eventForm = this.fb.group({
            eventName: ['', [Validators.required]],
            endDate: [new Date(), [Validators.required]],
            content: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        /* console.log(this.groupId) */
    }

    get eventName() {
        return this.eventForm.get('eventName');
    }

    get endDate() {
        return this.eventForm.get('endDate');
    }

    get content() {
        return this.eventForm.get('content');
    }

    onCloseModal() {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
        this.eventForm.reset();
    }

    onSubmit() {
        if (this.eventForm.invalid) {
            this.eventForm.markAllAsTouched();
            return;
        }

        const tmp = new Date(this.eventForm.getRawValue().endDate).getTime() + 86400000;
        const formData = {
            ...this.eventForm.getRawValue(),
            groupId: this.groupId,
            endDate: new Date(tmp),
        };

        this.eventClient.createEvent(formData).subscribe((response) => {
            this.toastr.success('Tạo sự kiện thành công.');
            this.onCloseModal();
        });
    }
}
