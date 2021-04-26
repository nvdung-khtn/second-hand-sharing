import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './shared/service/anonymous-guard.service';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AnonymousGuard]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./modules/group/group.module').then(m => m.GroupModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./modules/notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuard]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
