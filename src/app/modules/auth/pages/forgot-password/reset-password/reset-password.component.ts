import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validator';
import Swal from 'sweetalert2';
import { AuthClient } from 'src/app/core/api-clients/auth.client';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  /* emailAddress!: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.emailAddress = this.route.snapshot.queryParamMap.get('emailAddress');
  } */
  registerForm: FormGroup;

  private isSuccess: boolean;
  constructor(private authClient: AuthClient, private fb: FormBuilder) {}

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
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
        dob: [new Date()],
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
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Dữ liệu đã nhập còn thiếu hoặc chưa hợp lệ.',
      });
      return;
    }
    console.log('data: ', this.registerForm.value);

    const response = await this.authClient.register(this.registerForm.value);
    this.authClient.register(this.registerForm.value).subscribe(
      (data) => {
        this.isSuccess = true;
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: 'Đăng ký tài khoản thành công.',
        });
      },
      (err) => {
        this.isSuccess = false;
        console.log(err);
      }
    );
  }
}
