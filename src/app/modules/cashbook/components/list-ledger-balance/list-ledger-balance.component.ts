import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ledger } from '../../../../shared/collection';
import { LedgerService } from '../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-list-ledger-balance',
  templateUrl: './list-ledger-balance.component.html',
  styleUrls: ['./list-ledger-balance.component.css']
})
export class ListLedgerBalanceComponent implements OnInit {

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
  }

  get ledgers(): Observable<Ledger[]> {
    const observable = this.ledgerService.getAsObservable() as Observable<Ledger[]>;
    return observable.pipe(
      map(
        ledgers => {
          return ledgers.filter( x => x.kind === 'BANK' || x.kind === 'CASH');
        }
      )
    );
  }

  printOpening(ledger: Ledger): number {
    if (ledger.balance.length === 1) {
      return ledger.balance[0].opening;
    }
    return 0;
  }

  printClosing(ledger: Ledger): number {
    if (ledger.balance.length === 1) {
      return ledger.balance[0].closing;
    }
    return 0;
  }

}
