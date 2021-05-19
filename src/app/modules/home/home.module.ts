import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DefaultComponent } from './components/default/default.component';


@NgModule({
  declarations: [
    HomeComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    SideMenuComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule,
  ]
})
export class HomeModule { }
