import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ledger } from '../../../shared/collection';
import { ApiService } from '../../../shared/services/api/api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LedgerBalanceService {
  ledger = new BehaviorSubject<Ledger>(emptyLedger);
  openingBalance = new BehaviorSubject<number>(0);
  closingBalance = new BehaviorSubject<number>(0);

  constructor(private api: ApiService) { }

  selectLedger(ledger: Ledger): void {
    this.ledger.next(ledger);
  }

  saveBalance(ledger: Ledger, opening: number, closing: number): Observable<any> {
    this.selectLedger(ledger);
    const id = this.ledger.value.id;
    const payload = {id, opening, closing};
    return this.api.update<any>('balance', payload)
    .pipe(
      tap(() => {
        this.openingBalance.next(opening);
        this.closingBalance.next(closing);
      })
    );
  }
}

const emptyLedger: Ledger = {
  id: 0,
  title: '',
  kind: '',
  created_at: '',
  updated_at: ''
};
