import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-auth-forgot-password',
    templateUrl: './auth-forgot-password.component.html',
    styleUrls: ['./auth-forgot-password.component.scss'],
})
export class AuthForgotPasswordComponent implements OnInit {
    isLoading: boolean = false;
    emailValue: string = '';
    displayError = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authClient: AuthClient
    ) {}
    ngOnInit(): void {}

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    onSubmit(email) {
        this.isLoading = true;

        if (this.isValidEmail(email)) {
            // Submit action
            this.authClient.sendEmail({ email }).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.emailValue = '';
                    Swal.fire({
                        icon: 'success',
                        title: 'Success...',
                        text: 'Đã gửi Gmail, vui lòng kiểm tra hộp thư đến.',
                    });
                },
                error: (error) => {
                    this.isLoading = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Email không tồn tại trong hệ thống.',
                    });
                },
            });
        } else {
            this.isLoading = false;
            this.displayError = true;
        }
    }

    handleOnInput() {
        this.displayError = false;
    }
}
