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
    this.router.navigate(['/invoices', 'wait']);
  }

  setUdhaar(): void {
    this.store.paymentMethod = 'UDHAAR';
    this.router.navigate(['/invoices', 'wait']);
  }

}
