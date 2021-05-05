import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { CashbookRoutingModule } from './cashbook-routing.module';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';


@NgModule({
  declarations: [
    CashbookComponent,
    VoucherFormComponent,
  ],
  imports: [
    CommonModule,
    CashbookRoutingModule,
    CoreModule
  ],
  providers: []
})
export class CashbookModule { }
