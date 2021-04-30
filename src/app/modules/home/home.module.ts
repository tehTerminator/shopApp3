import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    HomeComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule,
  ]
})
export class HomeModule { }
