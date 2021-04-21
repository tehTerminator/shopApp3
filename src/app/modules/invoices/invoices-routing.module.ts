import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { ChoosePaymentMethodComponent } from './pages/choose-payment-method/choose-payment-method.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { SelectCustomerComponent } from './pages/select-customer/select-customer.component';

const routes: Routes = [
  {
    path: '', component: InvoicesComponent, children: [
      { path: 'customer', component: SelectCustomerComponent },
      { path: 'list-items', component: ListItemsComponent },
      { path: 'transactions', component: CreateTransactionComponent },
      { path: 'paymentMethod', component: ChoosePaymentMethodComponent },
      { path: '**', redirectTo: 'customer', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
