import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailDiscussionComponent } from './pages/detail-discussion/detail-discussion.component';
import { DetailGroupComponent } from './pages/detail-group/detail-group.component';
import { DetailItemsEventComponent } from './pages/detail-items-event/detail-items-event.component';
import { EventComponent } from './pages/event/event.component';
import { GroupComponent } from './pages/group/group.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: GroupComponent },
    { path: ':id', component: DetailGroupComponent },
    { path: ':id/:tabId', component: DetailGroupComponent },
    { path: ':groupId/2/:discussionId', component: DetailDiscussionComponent },
    { path: ':groupId/3/:eventId', component: EventComponent },
    { path: ':groupId/3/:eventId/item/:itemId', component: DetailItemsEventComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes), FormsModule],
    exports: [RouterModule],
})
export class GroupRoutingModule {}
