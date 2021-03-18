import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'login',
  //       component: LoginComponent
  //     },
  //   ]
  // },
  { path: 'auth/register', component: LoginComponent, redirectTo: '/auth/register', pathMatch: 'full' },
  { path: 'auth/login', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
