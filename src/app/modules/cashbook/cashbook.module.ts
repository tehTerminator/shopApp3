import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashbookRoutingModule } from './cashbook-routing.module';
import { CashbookComponent } from './cashbook.component';


@NgModule({
  declarations: [
    CashbookComponent
  ],
  imports: [
    CommonModule,
    CashbookRoutingModule
  ]
})
export class CashbookModule { }
