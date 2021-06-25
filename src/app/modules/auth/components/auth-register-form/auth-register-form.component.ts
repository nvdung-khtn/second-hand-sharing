import { Component, OnInit } from '@angular/core';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/service/format-datepicker.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-register-form',
    templateUrl: './auth-register-form.component.html',
    styleUrls: ['./auth-register-form.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ],
})
export class AuthRegisterFormComponent implements OnInit {
    registerForm: FormGroup;
    loading: boolean = false;

    private isSuccess: boolean;
    constructor(private authClient: AuthClient, private fb: FormBuilder, private router: Router) {}
    get fullName() {
        return this.registerForm.get('fullName');
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    get phoneNumber() {
        return this.registerForm.get('phoneNumber');
    }

    get dob() {
        return this.registerForm.get('dob');
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group(
            {
                fullName: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/),
                    ]),
                ],
                confirmPassword: ['', [Validators.required]],
                phoneNumber: ['', [Validators.required]],
                dob: [new Date(), [Validators.required]],
            },
            { validator: passwordMatchValidator }
        );
    }

    // handleInput(data) {
    //   //this.formData[`${data.type}`] = data.value;
    //   const key = `${data.type}`;
    //   this.registerForm.patchValue({
    //     key : data.value
    //   })
    // }

    async onSubmit() {
        this.registerForm.markAllAsTouched();
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        const response = await this.authClient.register(this.registerForm.value);
        this.authClient.register(this.registerForm.value).subscribe(
            async (data) => {
                this.loading = false;
                this.isSuccess = true;
                await Swal.fire({
                    icon: 'success',
                    title: 'Success...',
                    text: 'Đăng ký tài khoản thành công. Vui lòng kiểm tra email của bạn.',
                }).then((res) => {
                    this.router.navigate(['/auth/login']);
                });
            },
            (err) => {
                this.loading = false;
                this.isSuccess = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: `${err.error.Message}`,
                });
            }
        );
    }
}
