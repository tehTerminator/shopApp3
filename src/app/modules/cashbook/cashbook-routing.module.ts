import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';
import { TemplatePageTitleStrategy } from './../../shared/services/title-strategy/title-strategy';

const routes: Routes = [
  { path: 'voucher', title:'Create Voucher', component: VoucherFormComponent },
  { path: 'voucher/:id', title: 'Update Voucher', component: VoucherFormComponent },
  { path: 'balance', title: 'Balance Snapshot', loadChildren: () => import('./pages/ledger-balance/ledger-balance.module').then(m => m.LedgerBalanceModule) },
  { path: '**', redirectTo: 'voucher', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{
    provide: TitleStrategy,
    useClass: TemplatePageTitleStrategy
  }]
})
export class CashbookRoutingModule { }
