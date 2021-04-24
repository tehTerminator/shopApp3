import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Invoice, Transaction } from '../../../../shared/collection';
import { InvoiceStoreService } from './../../services/invoice-store.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styles: []
})
export class PreviewInvoiceComponent implements OnInit, OnDestroy {
  invoice: Invoice = { ... this.store.baseInvoice };
  sub: Subscription = new Subscription();
  constructor(private store: InvoiceStoreService) { }

  ngOnInit(): void {
    this.sub = this.store.invoice
    .subscribe(val => this.invoice = val);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  rowAmount(transaction: Transaction): number {
    return (transaction.quantity * transaction.rate ) * (1 - transaction.discount / 100);
  }

  deleteTransaction(index: number): void {
    this.store.deleteTransaction(index);
  }
}
