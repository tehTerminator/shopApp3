import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { InvoiceInfoComponent } from './invoice-info/invoice-info.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';

@NgModule({
    declarations: [
        CustomerTableComponent,
        InvoiceInfoComponent,
        PreviewInvoiceComponent,
        TransactionsTableComponent
    ],
    imports: [CommonModule, MatIconModule],
    exports: [PreviewInvoiceComponent]
})
export class SharedComponentModule { }
