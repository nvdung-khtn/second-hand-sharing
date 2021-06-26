import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import Swal from 'sweetalert2';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    code: string;
    userId: string;
    isLoading: boolean = false;

    private isSuccess: boolean;
    constructor(
        private authClient: AuthClient,
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    get email() {
        return this.resetForm.get('email');
    }

    get password() {
        return this.resetForm.get('password');
    }

    get confirmPassword() {
        return this.resetForm.get('confirmPassword');
    }

    ngOnInit(): void {
        this.code = this.getCodeFromURL();
        this.userId = this.getUserId();

        // Initialize reset form
        this.resetForm = this.fb.group(
            {
                //email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
                    ]),
                ],
                confirmPassword: ['', [Validators.required]],
                token: this.code,
                userId: this.userId,
            },
            { validator: passwordMatchValidator }
        );
    }

    async onSubmit() {
        this.resetForm.markAllAsTouched();
        if (this.resetForm.invalid) return;

        this.isLoading = true;
        this.authClient.resetPassword(this.resetForm.value).subscribe(
            async (data) => {
                this.isLoading = false;
                this.isSuccess = true;
                await Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Thay đổi mật khẩu thành công.',
                });

                this.router.navigate(['/auth/login']);
            },
            (err) => {
                this.isLoading = false;
                this.isSuccess = false;
                console.log(err);
            }
        );
    }

    getCodeFromURL() {
        const URL = this.router.url;
        const index = URL.indexOf('code=');
        let code = URL.slice(index + 5, URL.length);

        // Handle code
        for (let i = 0; i < code.length; i++) {
            if (code[i] === '%' && code[i + 2]) {
                if (code[i + 2] === 'F') {
                    code = code.slice(0, i) + '/' + code.slice(i + 3, code.length);
                }

                if (code[i + 2] === '0') {
                    code = code.slice(0, i) + '+' + code.slice(i + 3, code.length);
                }
            }
        }

        return code;
    }

    getUserId() {
        const URL = this.router.url;
        const index = URL.indexOf('userid=');
        const endIndex = URL.indexOf('&code=');
        let code = URL.slice(index + 7, endIndex);

        // Handle code
        for (let i = 0; i < code.length; i++) {
            if (code[i] === '%' && code[i + 2]) {
                if (code[i + 2] === 'F') {
                    code = code.slice(0, i) + '/' + code.slice(i + 3, code.length);
                }

                if (code[i + 2] === '0') {
                    code = code.slice(0, i) + '+' + code.slice(i + 3, code.length);
                }
            }
        }

        return code;
    }
}
