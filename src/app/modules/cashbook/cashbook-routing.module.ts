import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';

const routes: Routes = [
  { path: '', component: CashbookComponent, children: [
    { path: 'voucher', component: VoucherFormComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashbookRoutingModule { }
