import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthBtnComponent } from './components/auth-btn/auth-btn.component';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { AuthRegisterFormComponent } from './components/auth-register-form/auth-register-form.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthHeaderComponent, AuthBtnComponent, AuthInputComponent, AuthRegisterFormComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
