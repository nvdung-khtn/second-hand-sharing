import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { CampaignRoutingModule } from './campaign.routing';



@NgModule({
  declarations: [CampaignComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule
  ]
})
export class CampaignModule { }
