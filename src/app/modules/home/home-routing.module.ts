import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HomeComponent } from './home.component';
import { DefaultComponent } from './components/default/default.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'line/:url', component: LineChartComponent },
      { path: 'bar/:url', component: BarChartComponent },
      { path: 'pie/:url', component: PieChartComponent },
      { path: 'default', component: DefaultComponent },
      { path: '**', redirectTo: 'default', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
