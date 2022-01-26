import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../shared/collection';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { ApiService } from './../../../../shared/services/api/api.service';

@Injectable()
export class SearchInvoiceStoreService {
    invoices = new BehaviorSubject<Invoice[]>([]);

    constructor(
        private api: ApiService,
        private invoiceStore: InvoiceStoreService,
        private ns: NotificationService
    ) { }

    fetchInvoice(createdAt: string, userId: number): void {
        this.api
            .select<Invoice[]>('invoices', {
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

    fetchUsingCustomerId(customerId: number, month: string, paid: string): void {
        this.api.select<Invoice[]>('invoices', { customerId: customerId.toString(), month, paid })
            .subscribe(
                (data) => this.invoices.next(data)
            );
        // console.log(customerId, month, paid);
    }

    deleteInvoice(invoiceId: number): void {
        this.api.delete('invoices', invoiceId)
            .subscribe(
                () => {
                    this.removeInvoiceFromList(invoiceId);
                    this.invoiceStore.reset();
                }
            );
    }

    private removeInvoiceFromList(invoiceId: number): void {
        console.log('Invoice Id', invoiceId);
        const list = this.invoices.value;
        console.log(list);
        const index = list.findIndex(x => x.id === invoiceId);
        list.splice(index, 1);
        this.invoices.next(list);
    }
}
