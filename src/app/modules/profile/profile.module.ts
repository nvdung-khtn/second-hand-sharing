import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { AddressModalComponent } from '../home-page/components/address-modal/address-modal.component';
import { HomePageModule } from '../home-page/home-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        HomePageModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
})
export class ProfileModule {}
