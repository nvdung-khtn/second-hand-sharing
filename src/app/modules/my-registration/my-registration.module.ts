import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRegistrationComponent } from './pages/my-registration/my-registration.component';
import { MyRegistrationRouting } from './my-registration.routing';
import { HomePageModule } from '../home-page/home-page.module';



@NgModule({
  declarations: [MyRegistrationComponent],
  imports: [
    CommonModule,
    MyRegistrationRouting,
    HomePageModule
  ]
})
export class MyRegistrationModule { }
