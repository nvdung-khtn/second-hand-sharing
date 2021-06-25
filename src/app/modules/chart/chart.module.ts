import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './pages/chart/chart.component';
import { ChartRoutingModule } from './chart.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    SharedModule,
  ]
})
export class ChartModule { }
