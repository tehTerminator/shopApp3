import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../shared/collection';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
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
        private invoiceStore: InvoiceStoreService,
        private ns: NotificationService
    ) { }

    fetchInvoice(createdAt?: string, userId?: number): void {

        if (!!createdAt && !!userId) {
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
        else {
            if (this.initialized) {
                this.fetchInvoice(this.createdAt, this.userId);
            } else {
                this.ns.showError('Not Initialized', 'Please Refresh Using Form Data');
                return;
            }
        }

    }

    selectInvoice(id: number): void {
        this.api.select<Invoice>('invoices', { id: id.toString() })
            .subscribe(
                (data) => this.invoiceStore.invoice.next(data)
            );
    }
}
