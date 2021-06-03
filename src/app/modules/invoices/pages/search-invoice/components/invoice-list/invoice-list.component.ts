import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Invoice } from '../../../../../../shared/collection';
import { SearchInvoiceStoreService } from '../../search-invoice-store.service';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styles: ['']
})
export class InvoiceListComponent implements OnInit, OnDestroy {
    private sub: Subscription = new Subscription();
    dataLength = 0;
    get invoices(): Observable<Invoice[]> {
        return this.store.invoices;
    }

    selectInvoice(id: number): void {
        this.store.selectInvoice(id);
    }

    ngOnInit(): void {
        this.sub = this.store.invoices
            .subscribe(
                (data => this.dataLength = data.length)
            );
    }

    ngOnDestroy(): void { this.sub.unsubscribe(); }
    constructor(private store: SearchInvoiceStoreService) { }
}

