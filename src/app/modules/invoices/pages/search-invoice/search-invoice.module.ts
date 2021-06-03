import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from '../../shared-components/shared-components.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { SearchCriteriaFormComponent } from './components/search-criteria-form/search-criteria-form.component';
import { SearchInvoiceStoreService } from './search-invoice-store.service';
import { SearchInvoiceComponent } from './search-invoice.component';

const routes: Routes = [
    {path: '', component: SearchInvoiceComponent }
];

@NgModule({
    declarations: [
        SearchInvoiceComponent,
        InvoiceListComponent,
        SearchCriteriaFormComponent
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
