import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupComponent } from './pages/group/group.component';
import { GroupRoutingModule } from './group.routing';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailGroupComponent } from './pages/detail-group/detail-group.component';
import { AboutGroupComponent } from './components/about-group/about-group.component';
import { ItemsGroupComponent } from './components/items-group/items-group.component';
import { MembersGroupComponent } from './components/members-group/members-group.component';
import { MatIconModule } from '@angular/material/icon';
import { InviteModalComponent } from './components/invite-modal/invite-modal.component';
import { ListEventsComponent } from './components/list-events/list-events.component';
import { EventComponent } from './pages/event/event.component';
import { AboutEventComponent } from './components/about-event/about-event.component';
import { ListItemsEventComponent } from './components/list-items-event/list-items-event.component';
import { HomePageModule } from '../home-page/home-page.module';
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component';
import { DetailItemsEventComponent } from './pages/detail-items-event/detail-items-event.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        GroupComponent,
        CreateGroupModalComponent,
        DetailGroupComponent,
        AboutGroupComponent,
        ItemsGroupComponent,
        MembersGroupComponent,
        InviteModalComponent,
        CreateEventModalComponent,
        ListEventsComponent,
        EventComponent,
        AboutEventComponent,
        ListItemsEventComponent,
        DetailItemsEventComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GroupRoutingModule,
        MatCarouselModule.forRoot(),
        FormsModule,
        SharedModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        HomePageModule
    ],
})
export class GroupModule {}
