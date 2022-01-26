import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '../../shared-components/shared-components.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { SearchByDateComponent } from './components/search-by-date/search-by-date.component';
import { SearchInvoiceStoreService } from './search-invoice-store.service';
import { SearchInvoiceComponent } from './search-invoice.component';
import { InvoiceControlsComponent } from './components/invoice-controls/invoice-controls.component';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';
import { SearchByCustomerComponent } from './components/search-by-customer/search-by-customer.component';

const routes: Routes = [
    {
        path: '', component: SearchInvoiceComponent, children: [
            { path: 'search-by-operator', component: SearchByDateComponent },
            { path: 'search-by-customer', component: SearchByCustomerComponent },
            { path: '**', pathMatch: 'full', redirectTo: 'search-by-operator' }
        ]
    }
];

@NgModule({
    declarations: [
        SearchInvoiceComponent,
        InvoiceListComponent,
        SearchByDateComponent,
        InvoiceControlsComponent,
        DeleteInvoiceComponent,
        SearchByCustomerComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        SharedComponentModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [SearchInvoiceStoreService]
})
export class SearchInvoiceModule { }
