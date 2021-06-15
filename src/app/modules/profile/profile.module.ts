import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { AddressModalComponent } from '../home-page/components/address-modal/address-modal.component';
import { HomePageModule } from '../home-page/home-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        HomePageModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        FontAwesomeModule,
    ],
})
export class ProfileModule {}
