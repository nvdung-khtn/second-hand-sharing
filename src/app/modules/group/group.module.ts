import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupComponent } from './pages/group/group.component';
import { GroupRoutingModule } from './group.routing';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';

@NgModule({
    declarations: [GroupComponent, CreateGroupModalComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, GroupRoutingModule],
})
export class GroupModule {}
