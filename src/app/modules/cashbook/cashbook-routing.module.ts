import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';

const routes: Routes = [
  { path: '', component: CashbookComponent },
  { path: 'voucher', component: VoucherFormComponent },
  { path: 'statement', loadChildren: () => import('./pages/statement/statement.module').then(m => m.StatementModule) },
  { path: 'balance', loadChildren: () => import('./pages/ledger-balance/ledger-balance.module').then(m => m.LedgerBalanceModule) }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbookRoutingModule { }
