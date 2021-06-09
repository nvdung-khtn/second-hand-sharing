import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './modules/home-page/home-page.module';
import { GroupModule } from './modules/group/group.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ProfileModule } from './modules/profile/profile.module';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { MessagingService } from 'src/app/shared/service/message.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MyDonationsModule } from './modules/my-donations/my-donations.module';
// import { AuthRoutingModule } from './modules/auth/auth.routing';
// import { HomePageRoutingModule } from './modules/home-page/home-page.routing';
// import { GroupRoutingModule } from './modules/group/group.routing';
// import { NotificationRoutingModule } from './modules/notification/notification.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Modules of Angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // third-party modules
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: false,
      enableHtml: true,
    }),

    // Custom Modules
    SharedModule,
    HomePageModule,
    GroupModule,
    ProfileModule,
    NotificationModule,
    MyDonationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessagingService,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
