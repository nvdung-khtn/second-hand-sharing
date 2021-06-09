import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDonationsComponent } from './pages/my-donations/my-donations.component';

const routes: Routes = [{ path: '', component: MyDonationsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyDonationsRouting {}
