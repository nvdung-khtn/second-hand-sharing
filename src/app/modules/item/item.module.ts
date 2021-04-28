import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailItemComponent } from './pages/detail-item/detail-item.component';
import { ItemRoutingModule } from './item.routing';

@NgModule({
  declarations: [DetailItemComponent],
  imports: [CommonModule, ItemRoutingModule],
})
export class ItemModule {}
