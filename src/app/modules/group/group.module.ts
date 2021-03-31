import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './pages/group/group.component';
import { GroupRoutingModule } from './group-routing';



@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
  ]
})
export class GroupModule { }
