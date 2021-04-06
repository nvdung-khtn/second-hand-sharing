import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationRoutingModule } from './notification.routing';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
  ]
})
export class NotificationModule { }
