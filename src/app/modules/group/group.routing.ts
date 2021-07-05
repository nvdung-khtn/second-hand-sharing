import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailDiscussionComponent } from './pages/detail-discussion/detail-discussion.component';
import { DetailGroupComponent } from './pages/detail-group/detail-group.component';
import { DetailItemsEventComponent } from './pages/detail-items-event/detail-items-event.component';
import { EventComponent } from './pages/event/event.component';
import { GroupComponent } from './pages/group/group.component';

const routes: Routes = [
    { path: '', component: GroupComponent },
    { path: ':id', component: DetailGroupComponent },
    { path: ':groupId/discussion/:discussionId', component: DetailDiscussionComponent},
    { path: ':groupId/event/:eventId', component: EventComponent},
    { path: ':groupId/event/:eventId/item/:itemId', component: DetailItemsEventComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GroupRoutingModule {}
