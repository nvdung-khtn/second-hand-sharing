import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailItemComponent } from './pages/detail-item/detail-item.component';
import { ItemRoutingModule } from './item.routing';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [DetailItemComponent, RequestModalComponent],
    imports: [
        CommonModule,
        ItemRoutingModule,
        MatCarouselModule.forRoot(),
        FormsModule,
        SharedModule,
    ],
})
export class ItemModule {}
