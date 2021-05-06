import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import Swal from 'sweetalert2';
import { AuthClient } from 'src/app/core/api-clients/auth.client';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  code: string;

  private isSuccess: boolean;
  constructor(
    private authClient: AuthClient,
    private fb: FormBuilder,
    private router: Router
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
    this.getCodeFromURL();

    // Initialize reset form
    this.resetForm = this.fb.group(
      {
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
        token: this.code,
      },
      { validator: passwordMatchValidator }
    );
  }

  async onSubmit() {
    console.log('resetForm: ', this.resetForm.value);
    if (this.resetForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Dữ liệu đã nhập còn thiếu hoặc chưa hợp lệ.',
      });
      return;
    }

    const response = await this.authClient.resetPassword(this.resetForm.value);
    this.authClient.resetPassword(this.resetForm.value).subscribe(
      async (data) => {
        this.isSuccess = true;
        console.log(data);
        await Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Thay đổi mật khẩu thành công.',
        });

        this.router.navigate(['/auth/login']);
      },
      (err) => {
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

    this.code = code;
  }
}
