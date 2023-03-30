import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer, GeneralItem, Product } from '../../../shared/collection';
import { GeneralTransaction, Invoice } from '../../../shared/interface/Invoice'; 
import { Bundle } from '../../../shared/interface/Bundle';
import { Ledger } from '../../../shared/interface/Ledger';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { BundleService } from '../../../shared/services/bundle/bundle.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { TransactionStoreService } from './transactions.service';

@Injectable()
export class InvoiceStoreService {

  generalItem: GeneralItem;

  invoice = new BehaviorSubject<Invoice>(this.baseInvoice);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
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
    } else if (this.bundleService.isInstanceOfPosItem(this.selectedItem)) {
      this.handleBundle(this.selectedItem, quantity);
    } else {
      transaction = this.createTransactionFromProduct(quantity, rate, discount);
    }
    this.appendTransaction(transaction);
  }

  private createGeneralTransaction(quantity: number, rate: number, discount = 0) {
    let transaction = { ... this.baseGeneralTransaction };
    transaction.description = this.generalItem.title;
    transaction.quantity = quantity;
    transaction.rate = rate;
    transaction.discount = discount;



  }

  private appendGeneralTransaction(transaction: GeneralTransaction) {
    
  }

  private createDetailedTransaction() {

  }

  private createStockTransaction() {

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

  private handleBundle(bundle: Bundle, quantity: number, description?: string): void {
    for (const template of bundle.templates) {
      try {
        let item: Product | Ledger | Bundle = {... bundle };
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
      contact_id: 0,
      customer: {
        id: 0,
        title: 'NOT SELECTED',
        address: 'NOT SELECTED',
        created_at: '',
        updated_at: ''
      },
      user_id: 0,
      paid: false,
      amount: 0,
      created_at: '',
      updated_at: '',
      generalTransactions: [],
      detailedTransactions: [],
      stockTransactions: []
    };
  }

  get baseTransaction() {
    return {
      invoice_id: 0,
      quantity: 0,
    };
  }

  get baseGeneralTransaction() {
    return {
      ... this.baseTransaction,
      description: '',
      rate: 0,
      discount: 0
    };
  }

  get baseDetailedTransaction() {
    return {
      ... this.baseGeneralTransaction,
      item_id: 0,
      kind: '',
    }
  }

  get baseStockTransaction() {
    return {
      ... this.baseTransaction,
      stock_item_id: 0
    };
  };

}
