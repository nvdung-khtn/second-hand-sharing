import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailGroupComponent } from './pages/detail-group/detail-group.component';
import { GroupComponent } from './pages/group/group.component';

const routes: Routes = [
    { path: '', component: GroupComponent },
    { path: ':id', component: DetailGroupComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GroupRoutingModule {}
