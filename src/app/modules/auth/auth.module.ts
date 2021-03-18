import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthBtnComponent } from './components/auth-btn/auth-btn.component';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { AuthRegisterFormComponent } from './components/auth-register-form/auth-register-form.component';
import { AuthForgotPasswordComponent } from './components/auth-forgot-password/auth-forgot-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthOtpFormComponent } from './components/auth-otp-form/auth-otp-form.component';
import { OtpVerificationComponent } from './pages/forgot-password/otp-verification/otp-verification.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthHeaderComponent, AuthBtnComponent, AuthInputComponent, AuthRegisterFormComponent, AuthForgotPasswordComponent, ForgotPasswordComponent, AuthOtpFormComponent, OtpVerificationComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }
