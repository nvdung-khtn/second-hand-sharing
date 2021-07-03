import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './core/guards/anonymous.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

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
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./modules/notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'item',
    loadChildren: () =>
      import('./modules/item/item.module').then(m => m.ItemModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-donations',
    loadChildren: () =>
      import('./modules/my-donations/my-donations.module').then(m => m.MyDonationsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-registration',
    loadChildren: () =>
      import('./modules/my-registration/my-registration.module').then(m => m.MyRegistrationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chart',
    loadChildren: () =>
      import('./modules/chart/chart.module').then(m => m.ChartModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./modules/messages/messages.module').then(m => m.MessagesModule),
    canActivate: [AuthGuard]
  },
  // Fallback when no prior routes is matched
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
