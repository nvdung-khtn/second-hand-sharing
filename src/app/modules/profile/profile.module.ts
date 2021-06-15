import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { AddressModalComponent } from '../home-page/components/address-modal/address-modal.component';
import { HomePageModule } from '../home-page/home-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
@NgModule({
    declarations: [ProfileComponent, UserProfileComponent],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        HomePageModule,
        SharedModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        FontAwesomeModule,
    ],
})
export class ProfileModule {}
