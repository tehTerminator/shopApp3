import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../core/core.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SelectCustomerComponent } from './pages/select-customer/select-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { CreateTransactionComponent } from './pages/create-transaction/create-transaction.component';
import { ChoosePaymentMethodComponent } from './pages/choose-payment-method/choose-payment-method.component';
import { FormsModule } from '@angular/forms';
import { WaitPageComponent } from './pages/wait-page/wait-page.component';
import { GoBackBtnComponent } from './components/go-back-btn/go-back-btn.component';
import { SharedComponentModule } from './shared-components/shared-components.module';


@NgModule({
  declarations: [
    InvoicesComponent,
    SelectCustomerComponent,
    CreateCustomerComponent,
    ListCustomerComponent,
    ListItemsComponent,
    CreateTransactionComponent,
    ChoosePaymentMethodComponent,
    WaitPageComponent,
    GoBackBtnComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    CoreModule,
    SharedComponentModule,
    FormsModule
  ],
  providers: []
})
export class InvoicesModule { }
