import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';

const routes: Routes = [
  { path: 'voucher', component: VoucherFormComponent },
  { path: 'voucher/:id', component: VoucherFormComponent },
  { path: 'balance', loadChildren: () => import('./pages/ledger-balance/ledger-balance.module').then(m => m.LedgerBalanceModule) },
  { path: '**', redirectTo: 'voucher', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbookRoutingModule { }
