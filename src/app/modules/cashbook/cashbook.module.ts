import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { CashbookRoutingModule } from './cashbook-routing.module';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';
import { ListComponent } from './pages/list/list.component';
import { LedgerBalanceComponent } from './pages/ledger-balance/ledger-balance.component';
import { LedgerBalanceFormComponent } from './components/ledger-balance-form/ledger-balance-form.component';
import { ListLedgerBalanceComponent } from './components/list-ledger-balance/list-ledger-balance.component';


@NgModule({
  declarations: [
    CashbookComponent,
    VoucherFormComponent,
    ListComponent,
    LedgerBalanceComponent,
    LedgerBalanceFormComponent,
    ListLedgerBalanceComponent
  ],
  imports: [
    CommonModule,
    CashbookRoutingModule,
    CoreModule
  ],
  providers: []
})
export class CashbookModule { }
