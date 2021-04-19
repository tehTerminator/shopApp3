import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DefaultComponent } from './pages/default/default.component';
import { LedgerComponent } from './pages/ledger/ledger.component';
import { LedgerListComponent } from './pages/ledger/ledger-list/ledger-list.component';
import { LedgerFormComponent } from './pages/ledger/ledger-form/ledger-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    DefaultComponent,
    LedgerComponent,
    LedgerFormComponent,
    LedgerListComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
