import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './pages/campaign/campaign.component';

const routes: Routes = [
    { path: '', component: CampaignComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CampaignRoutingModule {}
