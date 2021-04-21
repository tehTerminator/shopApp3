import { Injectable } from '@angular/core';
import { runInThisContext } from 'node:vm';
import { BehaviorSubject } from 'rxjs';
import { Customer, Invoice, Transaction } from '../../../shared/collection';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreService {
  private readonly baseInvoice = {
    id: 0,
    customer_id: 1,
    customer: {
      id: 1,
      title: 'Cash',
      address: '',
      created_at: '',
      updated_at: ''
    },
    user_id: 0,
    paid: false,
    paymentMethod: 'CASH',
    amount: 0,
    transactions: [],
    created_at: '',
    updated_at: ''
  };

  invoice = new BehaviorSubject<Invoice>(this.baseInvoice);

  constructor() { }

  set customer(customer: Customer) {
    this.invoice.next({ ...this.invoice.value, customer, customer_id: customer.id });
  }

  set paid(paid: boolean) {
    this.invoice.next({...this.invoice.value, paid});
  }

  set paymentMethod(paymentMethod: string) {
    this.invoice.next({...this.invoice.value, paymentMethod});
  }

  removeTransaction(index: number): void {
    const invoice = this.invoice.value;
    invoice.transactions.splice(index, 1);
    this.invoice.next(invoice);
  }

  appendTransaction(transction: Transaction): void {
    const invoice = this.invoice.value;
    const indexOfTransaction = this.transactionsIndex(transction);
    if ( indexOfTransaction >= 0) {
      invoice.transactions.splice(indexOfTransaction, 1, transction);
    } else {
      invoice.transactions.push(transction);
    }
    invoice.amount = this.grandTotal(invoice);
    this.invoice.next(invoice);
  }

  private grandTotal(invoice: Invoice): number {
    let total = 0;
    for (const t of invoice.transactions) {
      total += this.calculateRowAmount(t);
    }
    return total;
  }

  private calculateRowAmount(transaction: Transaction): number {
    return (transaction.quantity * transaction.rate) * (1 - transaction.discount / 100);
  }


  private transactionsIndex(transaction: Transaction): number {
    const invoice = this.invoice.value;
    return invoice.transactions.findIndex(
      x => x.item_id === transaction.item_id
    );
  }

  reset(): void {
    this.invoice.next(this.baseInvoice);
  }
}
