import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer, Invoice, Ledger, PosItem, PosItemTemplate, Product, Transaction } from '../../../shared/collection';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { PosItemService } from '../../../shared/services/posItem/pos-item.service';
import { ProductService } from '../../../shared/services/product/product.service';

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

  private readonly baseTransaction = {
    id: 0,
    invoice_id: 0,
    item_id: 0,
    item_type: 'PRODUCT',
    description: '',
    quantity: 0,
    rate: 0,
    discount: 0,
    created_at: '',
    updated_at: ''
  };

  selectedItem: Product | Ledger | PosItem  = {
    id: 0,
    title: '',
    rate: 0,
    created_at: '',
    updated_at: ''
  };

  invoice = new BehaviorSubject<Invoice>(this.baseInvoice);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private posItemService: PosItemService,
  ) { }

  set customer(customer: Customer) {
    this.invoice.next({ ...this.invoice.value, customer, customer_id: customer.id });
  }

  set paid(paid: boolean) {
    this.invoice.next({ ...this.invoice.value, paid });
  }

  set paymentMethod(paymentMethod: string) {
    this.invoice.next({ ...this.invoice.value, paymentMethod });
  }

  removeTransaction(index: number): void {
    const invoice = this.invoice.value;
    invoice.transactions.splice(index, 1);
    this.invoice.next(invoice);
  }

  appendTransaction(transction: Transaction): void {
    const invoice = this.invoice.value;
    const indexOfTransaction = this.transactionsIndex(transction);
    if (indexOfTransaction >= 0) {
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

  createTransaction(quantity: number, rate: number, discount = 0): void {
    let transaction = { ...this.baseTransaction };

    if (this.ledgerService.isInstanceOfLedger(this.selectedItem)) {
      transaction = this.createTransactionFromLedger(quantity, rate);
    } else if (this.posItemService.isInstanceOfPosItem(this.selectedItem)) {
      for (const template of this.selectedItem.pos_templates) {
        try {
          let item: Product | Ledger | PosItem = {... this.selectedItem };
          if (template.kind === 'PRODUCT') {
            item = this.productService.getElementById(template.item_id) as Product;
          } else {
            item = this.ledgerService.getElementById(template.item_id) as Ledger;
          }
          this.selectedItem = item;
          this.createTransaction(template.quantity * quantity, template.rate);
        } catch (e) {
          console.log('Error for Template', template);
          throw new Error('Unable to Create Transaction, Please Check Log');
        }
      }
    } else {
      transaction = this.createTransactionFromProduct(quantity, rate, discount);
    }
    this.appendTransaction(transaction);
  }

  private createTransactionFromLedger(quantity: number, rate: number): Transaction {
      const description = `${this.selectedItem.title} Payment`;
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

  reset(): void {
    this.invoice.next(this.baseInvoice);
  }
}
