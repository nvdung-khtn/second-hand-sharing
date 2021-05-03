import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthBtnComponent } from './components/auth-btn/auth-btn.component';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { AuthRegisterFormComponent } from './components/auth-register-form/auth-register-form.component';
import { AuthForgotPasswordComponent } from './components/auth-forgot-password/auth-forgot-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthOtpFormComponent } from './components/auth-otp-form/auth-otp-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthHeaderComponent,
    AuthBtnComponent,
    AuthInputComponent,
    AuthRegisterFormComponent,
    AuthForgotPasswordComponent,
    ForgotPasswordComponent, AuthOtpFormComponent,
    ResetPasswordComponent,
    //MatFormField
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
