import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../shared/collection';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { ApiService } from './../../../../shared/services/api/api.service';

@Injectable()
export class SearchInvoiceStoreService {
    invoices = new BehaviorSubject<Invoice[]>([]);
    private _loading = false;

    constructor(
        private api: ApiService,
        private invoiceStore: InvoiceStoreService,
        private ns: NotificationService
    ) { }

    fetchInvoice(createdAt: string, userId: number): void {
        this._loading = true;
        this.api
            .select<Invoice[]>('invoices', {
                createdAt,
                userId: userId.toString()
            })
            .subscribe(
                (data) => this.invoices.next(data),
                (err) => {
                    console.log(err);
                    this.invoices.next([]);
                },
                () => this._loading = false;
            );
    }

    selectInvoice(id: number): void {
        this._loading = true;
        this.api.select<Invoice>('invoices', { id: id.toString() })
            .subscribe(
                (data) => this.invoiceStore.invoice.next(data),
                (err) => console.error(err),
                () => this._loading = false
            );
    }

    fetchUsingCustomerId(customerId: number, month: string, paid: string): void {
        this._loading = true;
        this.api.select<Invoice[]>('invoices', { customerId: customerId.toString(), month, paid })
            .subscribe(
                (data) => this.invoices.next(data),
                (err) => console.error(err),
                () => this._loading = false
            );
        // console.log(customerId, month, paid);
    }

    deleteInvoice(invoiceId: number): void {
        this._loading = true;
        this.api.delete('invoices', invoiceId)
            .subscribe(
                () => {
                    this.removeInvoiceFromList(invoiceId);
                    this.invoiceStore.reset();
                },
                (err) => console.error(err),
                () => this._loading = false
            );
    }

    get loading(): boolean {
        return this._loading;
    }

    private removeInvoiceFromList(invoiceId: number): void {
        const list = this.invoices.value;
        const index = list.findIndex(x => x.id === invoiceId);
        list.splice(index, 1);
        this.invoices.next(list);
    }
}
