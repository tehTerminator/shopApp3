import { Injectable } from '@angular/core';
import { create } from 'domain';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { ApiService } from './../../../../shared/services/api/api.service';

@Injectable()
export class SearchInvoiceStoreService {
    invoices = new BehaviorSubject<Invoice[]>([]);
    private createdAt = '';
    private userId = 0;
    private initialized = false;

    constructor(
        private api: ApiService,
        private invoiceStore: InvoiceStoreService
    ) { }

    fetchInvoice(createdAt?: string, userId?: number): void {

        if (createdAt === undefined && userId === undefined && this.initialized) {
            this.fetchInvoice(this.createdAt, this.userId);
        }
        else {
            this.createdAt = createdAt;
            this.userId = userId;
            this.initialized = true;
            this.api
                .select<Invoice[]>('invoices', {
                    createdAt,
                    userId: userId.toString()
                })
                .subscribe(
                    (data) => this.invoices.next(data)
                );
        }

    }

    selectInvoice(id: number): void {
        this.api.select<Invoice>('invoices', { id: id.toString() })
            .subscribe(
                (data) => this.invoiceStore.invoice.next(data)
            );
    }
}
