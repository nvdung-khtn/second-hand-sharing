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
import { TimePipe } from './pipes/time.pipe';
import { AddressPipe } from './pipes/address.pipe';
import { MessengerComponent } from './components/messenger/messenger.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeRightSideComponent,
        HomeLeftSideComponent,
        MessageModalComponent,
        MessengerComponent,
        TimePipe,
        AddressPipe,
        PhoneNumberPipe,
    ],
    imports: [CommonModule, RouterModule, MatIconModule, FontAwesomeModule, FormsModule],
    exports: [
        HeaderComponent,
        HomeRightSideComponent,
        HomeLeftSideComponent,
        MessageModalComponent,
        TimePipe,
        AddressPipe,
        PhoneNumberPipe,
        MessengerComponent,
    ],
    providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
})
export class SharedModule {}
