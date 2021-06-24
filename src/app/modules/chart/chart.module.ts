import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './pages/chart/chart.component';
import { ChartRoutingModule } from './chart.routing';



@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
