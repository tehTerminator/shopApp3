import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
    styles: ['']
})
export class InvoiceInfoComponent implements OnInit, OnDestroy {
    invoiceId = 0;
    createdAt = '';
    customerId = 0;
    sub: Subscription = new Subscription();

    ngOnInit(): void {
        this.sub = this.store.invoice
            .subscribe(invoice => {
                this.invoiceId = invoice.id;
                this.customerId = invoice.customer_id;
                this.createdAt = invoice.created_at;
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    constructor(private store: InvoiceStoreService) { }
}
