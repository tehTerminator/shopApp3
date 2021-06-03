import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { ChoosePaymentMethodComponent } from './pages/choose-payment-method/choose-payment-method.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { SearchInvoiceComponent } from './pages/search-invoice/search-invoice.component';
import { SelectCustomerComponent } from './pages/select-customer/select-customer.component';
import { WaitPageComponent } from './pages/wait-page/wait-page.component';

const routes: Routes = [
  {
    path: 'create', component: InvoicesComponent, children: [
      { path: 'select-customer', component: SelectCustomerComponent },
      { path: 'list-items', component: ListItemsComponent },
      { path: 'transactions', component: CreateTransactionComponent },
      { path: 'paymentMethod', component: ChoosePaymentMethodComponent },
      { path: '**', redirectTo: 'select-customer', pathMatch: 'full' }
    ],
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search-invoice/search-invoice.module')
      .then(m => m.SearchInvoiceModule)
  },
  { path: 'wait', component: WaitPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
