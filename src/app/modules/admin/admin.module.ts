import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DefaultComponent } from './pages/default/default.component';
import { LedgerComponent } from './pages/ledger/ledger.component';
import { FormComponent } from './pages/ledger/form/form.component';
import { ListComponent } from './pages/ledger/list/list.component';
import { ProductsComponent } from './pages/products/products.component';


@NgModule({
  declarations: [
    AdminComponent,
    DefaultComponent,
    LedgerComponent,
    FormComponent,
    ListComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
