import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { HomeLeftSideComponent } from './components/home-left-side/home-left-side.component';
import { HomeRightSideComponent } from './components/home-right-side/home-right-side.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MessageModalComponent } from './components/modal/message-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeRightSideComponent,
    HomeLeftSideComponent,
    MessageModalComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule, FontAwesomeModule],
  exports: [HeaderComponent, HomeRightSideComponent, HomeLeftSideComponent, MessageModalComponent],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
})
export class SharedModule {}
