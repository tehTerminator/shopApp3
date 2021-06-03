import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { ApiService } from './../../../../shared/services/api/api.service';

@Injectable()
export class SearchInvoiceStoreService {
    invoices = new BehaviorSubject<Invoice[]>([]);
    constructor(
        private api: ApiService,
        private invoiceStore: InvoiceStoreService
    ) { }

    fetchInvoice(createdAt: string, userId: number): void {
        this.api.select<Invoice[]>('invoices', {
            createdAt,
            userId: userId.toString()
        })
            .subscribe(
                (data) => this.invoices.next(data)
            );
    }

    selectInvoice(id: number): void {
        this.api.select<Invoice>('invoices', { id: id.toString() })
            .subscribe(
                (data) => this.invoiceStore.invoice.next(data)
            );
    }
}
