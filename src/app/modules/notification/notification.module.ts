import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationRoutingModule } from './notification.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule,
  ]
})
export class NotificationModule { }
