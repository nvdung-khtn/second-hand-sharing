import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './modules/auth/auth.routing';
import { HeaderComponent } from './layout/header/header.component';
import { HomePageRoutingModule } from './modules/home-page/home-page.routing';
import { HomePageModule } from './modules/home-page/home-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupRoutingModule } from './modules/group/group.routing';
import { GroupModule } from './modules/group/group.module';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationRoutingModule } from './modules/notification/notification.routing';
import { HomeLeftSideComponent } from './layout/home-left-side/home-left-side.component';
import { HomeRightSideComponent } from './layout/home-right-side/home-right-side.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeLeftSideComponent,
    HomeRightSideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthRoutingModule,
    HomePageRoutingModule,
    HomePageModule,
    GroupRoutingModule,
    GroupModule,
    NotificationModule,
    NotificationRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
