import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Invoice, Transaction } from '../../../shared/collection';
import { ApiService } from '../../../shared/services/api/api.service';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { InvoiceStoreService } from './invoice-store.service';

@Injectable()
export class InvoiceApiService {
    private vouchers: Voucher[] = [];

    constructor(
        private ledgerService: LedgerService,
        private api: ApiService,
        private store: InvoiceStoreService) { }


    saveInvoice(): Observable<Invoice> {
        const invoice = this.store.invoice.value;
        return this.api.create('invoices', invoice);
    }

    private generateVoucherEntries(transactions: Transaction[]): void {
        this.vouchers = [];
        for (const t of transactions) {
            if (t.item_type === 'LEDGER' ) {

            }
        }
    }

    
}
