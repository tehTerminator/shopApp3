import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Invoice, Ledger } from '../../../../../../shared/collection';
import { SearchInvoiceStoreService } from '../../search-invoice-store.service';
import { LedgerService } from '../../../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  dataLength = 0;
  get invoices(): Observable<Invoice[]> {
    return this.store.invoices;
  }

  getLedger(id: number): Ledger {
    if (id === 0) {
      return {
        id: 0,
        title: 'MULTIPLE',
        kind: '',
        created_at: '',
        updated_at: '',
      };
    }

    if (id === -1) {
      return {
        id: 0,
        title: 'Udhaar',
        kind: '',
        created_at: '',
        updated_at: '',
      };
    }

    try {
      const ledger = this.ledgerService.getElementById(id) as Ledger;
      return ledger;
    } catch (e) {
      return {
        id: 0,
        title: 'Udhaar',
        kind: '',
        created_at: '',
        updated_at: '',
      };
    }
  }

  selectInvoice(id: number): void {
    console.log('Selecting ', id);
    this.store.selectInvoice(id);
  }

  ngOnInit(): void {
    this.ledgerService.init();
    this.sub = this.store.invoices.subscribe(
      (data) => (this.dataLength = data.length)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(
    private ledgerService: LedgerService,
    private store: SearchInvoiceStoreService
  ) {}
}
