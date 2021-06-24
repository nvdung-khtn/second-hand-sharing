import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { AddressModel } from 'src/app/core/constants/address.constant';
import { AddressService } from 'src/app/shared/service/address.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loading = false;
    isError = false;
    message: string;
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private authClient: AuthClient,
        private fb: FormBuilder,
        private addressService: AddressService
    ) {}

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    navigation(str: string) {
        switch (str) {
            case 'register':
                this.router.navigateByUrl('/auth/register');
                break;
            case 'forgot':
                this.router.navigateByUrl('/auth/forgot-password');
                break;
        }
    }

    onSubmit() {
        this.loading = true;
        this.authClient.login(this.loginForm.value).subscribe(
            (response) => {
                this.isError = false;
                this.loading = false;
                localStorage.setItem('access_token', response.data.jwToken);
                localStorage.setItem('expiration', response.data.expiration.toString());
                localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
                this.router.navigate(['/home']).then(() => {
                    window.location.reload();
                });
            },
            (err) => {
                this.loading = false;
                this.isError = true;
                this.message = err.message;
                // Ném Error ra interceptor handling error.
            }
        );
    }
}
