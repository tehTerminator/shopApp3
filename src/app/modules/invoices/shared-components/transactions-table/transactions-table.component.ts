import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { Transaction } from '../../../../shared/collection';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styles: ['']
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
    private _transactions: Transaction[] = [];
    private sub: Subscription = new Subscription();

    constructor(private store: InvoiceStoreService) { }

    ngOnInit(): void {
        this.sub = this.store.invoice.subscribe(
            (invoice => this._transactions = invoice.transactions)
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    rowAmount(transaction: Transaction): number {
        return (transaction.quantity * transaction.rate) * (1 - transaction.discount / 100);
    }

    deleteTransaction(index: number): void {
        this.store.deleteTransaction(index);
    }

    private grossRowAmount(t: Transaction): number {
        return t.quantity * t.rate;
    }

    private rowDiscount(t: Transaction): number {
        return t.quantity * t.rate * t.discount / 100;
    }

    get grossAmount(): number {
        let total = 0;
        for (const t of this.transactions) {
            total += this.grossRowAmount(t);
        }
        return total;
    }

    get totalDiscount(): number {
        let total = 0;
        for (const t of this.transactions) {
            total += this.rowDiscount(t);
        }
        return total;
    }

    get netTotal(): number {
        return this.grossAmount - this.totalDiscount;
    }

    get colspan(): number {
        if (this.showButtons()) {
            return 5;
        }
        return 4;
    }

    get transactions(): Transaction[] {
        return this._transactions;
    }


    showButtons(): boolean {
        return this.store.invoice.value.id === 0;
    }

}
