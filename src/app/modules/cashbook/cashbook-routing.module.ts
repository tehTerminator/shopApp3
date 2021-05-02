import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';
import { ListComponent } from './pages/list/list.component';
import { LedgerBalanceComponent } from './pages/ledger-balance/ledger-balance.component';

const routes: Routes = [
  { path: '', component: CashbookComponent },
  { path: 'voucher', component: VoucherFormComponent },
  { path: 'list', component: ListComponent },
  { path: 'balance', component: LedgerBalanceComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbookRoutingModule { }
