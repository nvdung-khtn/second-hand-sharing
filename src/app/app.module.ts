import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './modules/home-page/home-page.module';
import { GroupModule } from './modules/group/group.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

//import { AuthRoutingModule } from './modules/auth/auth.routing';
//import { HomePageRoutingModule } from './modules/home-page/home-page.routing';
//import { GroupRoutingModule } from './modules/group/group.routing';
//import { NotificationRoutingModule } from './modules/notification/notification.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Modules of Angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    // Custom Modules
    SharedModule,
    HomePageModule,
    GroupModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
