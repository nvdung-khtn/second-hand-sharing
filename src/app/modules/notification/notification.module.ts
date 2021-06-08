import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './pages/notification/notification.component';
import { NotificationRoutingModule } from './notification.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule, NotificationRoutingModule, SharedModule, InfiniteScrollModule],
})
export class NotificationModule {}
