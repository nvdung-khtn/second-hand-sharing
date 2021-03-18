import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './modules/auth/pages/forgot-password/otp-verification/otp-verification.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: 'auth/register', component: RegisterComponent},
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/forgot-password/otp-verification', component: OtpVerificationComponent },
  {
    path: 'auth/login',
    component: LoginComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
