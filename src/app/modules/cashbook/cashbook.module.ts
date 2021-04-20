import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { CashbookRoutingModule } from './cashbook-routing.module';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    CashbookComponent,
    VoucherFormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CashbookRoutingModule,
    CoreModule
  ]
})
export class CashbookModule { }
