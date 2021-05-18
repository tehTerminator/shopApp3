import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { Customer } from './../../../../shared/collection';

@Component({
    selector: 'app-customer-table',
    templateUrl: './customer-table.component.html',
    styles: ['']
})
export class CustomerTableComponent implements OnInit, OnDestroy {
    customer: Customer | null = null;
    private sub: Subscription = new Subscription();

    ngOnInit(): void {
        this.sub = this.store.invoice.subscribe(
            (invoice => this.customer = invoice.customer)
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    constructor(private store: InvoiceStoreService) { }
}
