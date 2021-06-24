import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDonationsComponent } from './pages/my-donations/my-donations.component';
import { MyDonationsRouting } from './my-donations.routing';
import { HomePageModule } from '../home-page/home-page.module';



@NgModule({
  declarations: [MyDonationsComponent],
  imports: [
    CommonModule,
    MyDonationsRouting,
    HomePageModule
  ],
  exports: [
    MyDonationsComponent
  ]
})
export class MyDonationsModule { }
