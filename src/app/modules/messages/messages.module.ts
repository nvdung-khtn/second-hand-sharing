import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './pages/messages/messages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagesRouting } from './messages.routing';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MessagesRouting
  ]
})
export class MessagesModule { }
