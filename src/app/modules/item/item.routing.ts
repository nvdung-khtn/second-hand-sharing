import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailItemComponent } from './pages/detail-item/detail-item.component';

const routes: Routes = [{ path: ':itemId', component: DetailItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
