import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ledger } from '../../../../shared/collection';
import { LedgerService } from '../../../../shared/services/ledger/ledger.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.component.html',
  styleUrls: ['./choose-payment-method.component.css']
})
export class ChoosePaymentMethodComponent implements OnInit {

  constructor(
    private ledgerService: LedgerService,
    private store: InvoiceStoreService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.store.customer.id === 0) {
      this.router.navigate(['/invoices', 'create', 'select-customer']);
      return;
    }

    if (this.store.selectedItem.id === 0) {
      this.router.navigate(['/invoices', 'create', 'list-items']);
      return;
    }

    if (this.store.invoice.value.transactions.length === 0) {
      this.router.navigate(['/invoices', 'create', 'list-items']);
      return;
    }
  }

  get ledgers(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>)
    .pipe(
      map(
        ledgers => ledgers.filter(
          x => x.kind === 'BANK' || x.kind === 'CASH'
        )
      )
    );
  }

  selectPaymentMethod(ledger: Ledger): void {
    this.store.paymentMethod = `${ledger.title}#${ledger.id}`;
    this.store.paid = true;
    this.router.navigate(['/invoices', 'wait']);
  }

  setUdhaar(): void {
    this.store.paymentMethod = 'UDHAAR';
    this.store.paid = false;
    this.router.navigate(['/invoices', 'wait']);
  }

}
