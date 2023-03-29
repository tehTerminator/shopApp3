import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer, Product } from '../../../shared/collection';
import { Invoice } from '../../../shared/interface/Invoice'; 
import { Bundle } from '../../../shared/interface/Bundle';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { BundleService } from '../../../shared/services/bundle/bundle.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { TransactionStoreService } from './transactions.service';

@Injectable()
export class InvoiceStoreService {

  selectedItem: Product | Ledger | Bundle;

  invoice = new BehaviorSubject<Invoice>(this.baseInvoice);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private posItemService: BundleService,
    private transactionService: TransactionStoreService
  ) { }

  set customer(customer: Customer) {
    this.invoice.next({ ...this.invoice.value, customer, contact_id: customer.id });
  }

  get customer(): Customer {
    return this.invoice.value.customer;
  }

  set paid(paid: boolean) {
    this.invoice.next({ ...this.invoice.value, paid });
  }

  // set paymentMethod(paymentMethod: string) {
  //   this.invoice.next({ ...this.invoice.value, paymentMethod });
  // }

  // get paymentMethod(): string {
  //   return this.invoice.value.paymentMethod;
  // }

  removeTransaction(index: number): void {
    const invoice = this.invoice.value;
    invoice.transactions.splice(index, 1);
    this.invoice.next(invoice);
  }

  appendTransaction(transaction: Transaction): void {
    if (transaction.quantity === 0 || transaction.rate === 0) {
      return;
    }
    const invoice = this.invoice.value;
    const indexOfTransaction = this.findTransactionIndex(transaction);
    if (indexOfTransaction >= 0) {
      transaction.quantity += invoice.transactions[indexOfTransaction].quantity;
      invoice.transactions.splice(indexOfTransaction, 1, transaction);
    } else {
      invoice.transactions.push(transaction);
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


  private findTransactionIndex(transaction: Transaction): number {
    const invoice = this.invoice.value;
    return invoice.transactions.findIndex(
      x => {
        return x.item_id === transaction.item_id && x.rate === transaction.rate;
      }
    );
  }

  createTransaction(quantity: number, rate: number, discount = 0, description?: string): void {
    let transaction = { ...this.baseTransaction };

    if (this.ledgerService.isInstanceOfLedger(this.selectedItem)) {
      transaction = this.createTransactionFromLedger(quantity, rate, description);
    } else if (this.posItemService.isInstanceOfPosItem(this.selectedItem)) {
      this.handlePosItem(this.selectedItem, quantity);
    } else {
      transaction = this.createTransactionFromProduct(quantity, rate, discount);
    }
    this.appendTransaction(transaction);
  }

  private createTransactionFromLedger(quantity: number, rate: number, description?: string): Transaction {
      if (description === undefined || description === null) {
        description = `${this.selectedItem.title} Payment`;
      }
      const discount = 0; // No Discount for Payments
      // tslint:disable-next-line: variable-name
      const item_id = this.selectedItem.id;
      // tslint:disable-next-line: variable-name
      const item_type = 'LEDGER';

      return { ...this.baseTransaction, description, discount, item_id, item_type, quantity, rate };
  }

  private createTransactionFromProduct(quantity: number, rate: number, discount: number): Transaction {
    const description = this.selectedItem.title;
    // tslint:disable-next-line: variable-name
    const item_id = this.selectedItem.id;

    return {...this.baseTransaction, quantity, rate, discount, description, item_id };
  }

  private handlePosItem(posItem: PosItem, quantity: number, description?: string): void {
    for (const template of posItem.pos_templates) {
      try {
        let item: Product | Ledger | PosItem = {... posItem };
        if (template.kind === 'PRODUCT') {
          item = this.productService.getElementById(template.item_id) as Product;
        } else {
          item = this.ledgerService.getElementById(template.item_id) as Ledger;
        }
        this.selectedItem = item;
        this.createTransaction(template.quantity * quantity, template.rate, 0, description);
      } catch (e) {
        console.log('Error for Template', template);
        throw new Error('Unable to Create Transaction, Please Check Log');
      }
    }
  }

  deleteTransaction(index: number): void {
    const invoice = this.invoice.value;
    invoice.transactions.splice(index, 1);
    this.invoice.next(invoice);
  }

  reset(): void {
    this.invoice.next(this.baseInvoice);
  }

}
