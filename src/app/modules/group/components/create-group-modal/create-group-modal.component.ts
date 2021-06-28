import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GroupClient } from 'src/app/core/api-clients/group.client';
import { Group } from 'src/app/core/constants/group.constant';

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
    @Input() modal: boolean = false;
    @Output() modalChange = new EventEmitter<boolean>();

    groupForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private groupClient: GroupClient,
        private toastr: ToastrService
    ) {
        this.groupForm = this.fb.group({
            groupName: ['', [Validators.required]],
            description: ['', [Validators.required]],
            rules: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    get groupName() {
        return this.groupForm.get('groupName');
    }

    get description() {
        return this.groupForm.get('description');
    }

    get rules() {
        return this.groupForm.get('rules');
    }

    onCloseModal() {
        this.modal = false;
        this.modalChange.emit(this.modal);
    }

    onSubmit() {
        if (this.groupForm.invalid) {
            this.groupForm.markAllAsTouched();
            return;
        }

        this.groupClient.createGroup(this.groupForm.getRawValue()).subscribe((response) => {
            this.toastr.success('Tạo group thành công.');
            this.onCloseModal();
            window.location.reload();
        });
    }
}
