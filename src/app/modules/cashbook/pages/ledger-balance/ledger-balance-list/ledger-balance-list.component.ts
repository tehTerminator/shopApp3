import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ledger } from './../../../../../shared/collection';
import { LedgerService } from './../../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-ledger-balance-list',
  template: `
    <table class="table bg-light text-center">
      <thead>
          <tr>
              <th>Ledger Name</th>
              <th>Opening Balance</th>
              <th>Closing Balance</th>
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let ledger of ledgers | async">
              <td>{{ ledger.title }}</td>
              <td class="text-center">{{ printOpening(ledger) | currency:'INR' }}</td>
              <td class="text-center">{{ printClosing(ledger) | currency: 'INR' }}</td>
          </tr>
      </tbody>
    </table>
  `,
  styles: ['']
})
export class LedgerBalanceListComponent implements OnInit {

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
  }

  get ledgers(): Observable<Ledger[]> {
    const observable = this.ledgerService.getAsObservable() as Observable<Ledger[]>;
    return observable.pipe(
      map(
        ledgers => {
          return ledgers.filter(x => x.kind === 'BANK' || x.kind === 'CASH');
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
