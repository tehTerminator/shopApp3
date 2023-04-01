import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer, Invoice, Ledger, PosItem, Product, Transaction } from '../../../shared/collection';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { PosItemService } from '../../../shared/services/posItem/pos-item.service';
import { ProductService } from '../../../shared/services/product/product.service';

@Injectable()
export class InvoiceStoreService {

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

  get customer(): Customer {
    return this.invoice.value.customer;
  }

  set paid(paid: boolean) {
    this.invoice.next({ ...this.invoice.value, paid });
  }

  set paymentMethod(paymentMethod: number) {
    this.invoice.next({ ...this.invoice.value, paymentMethod });
  }

  get paymentMethod(): number {
    return this.invoice.value.paymentMethod;
  }

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

  get baseInvoice(): Invoice {
    return {
      id: 0,
      customer_id: 0,
      customer: {
        id: 0,
        title: 'NOT SELECTED',
        address: 'NOT SELECTED',
        created_at: '',
        updated_at: ''
      },
      user_id: 0,
      paid: false,
      paymentMethod: 0,
      amount: 0,
      transactions: [],
      created_at: '',
      updated_at: ''
    };
  }

  get baseTransaction(): Transaction {
    return {
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
  }
}
