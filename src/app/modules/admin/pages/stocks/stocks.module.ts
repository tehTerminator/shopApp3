import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent } from './stocks.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { CoreModule } from './../../../../modules/core/core.module';
import { StockTableComponent } from './components/stock-table/stock-table.component';
import { MatTableModule } from '@angular/material/table';


const routes: Routes = [
  { path: '', component: StocksComponent }
];

@NgModule({
  declarations: [
    StocksComponent,
    StockFormComponent,
    StockTableComponent
  ],
  imports: [
    MatTableModule,
    CoreModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class StocksModule { }
