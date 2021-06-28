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

@NgModule({
    declarations: [GroupComponent, CreateGroupModalComponent, DetailGroupComponent, AboutGroupComponent, ItemsGroupComponent, MembersGroupComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, GroupRoutingModule, SharedModule, MatIconModule],
})
export class GroupModule {}
