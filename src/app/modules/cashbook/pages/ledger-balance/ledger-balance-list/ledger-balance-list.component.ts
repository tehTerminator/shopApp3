import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { LedgerBalance, LedgerBalanceService } from '../ledger-balance.service';
import { getCurrentDateString } from './../../../../../shared/functions';

@Component({
  selector: 'app-ledger-balance-list',
  templateUrl: './ledger-balance-list.component.html',
  styles: ['']
})
export class LedgerBalanceListComponent implements OnInit, OnDestroy {
  dateField = new FormControl();
  hasData = false;
  sub = new Subscription();
  constructor(private store: LedgerBalanceService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.dateField.setValue(getCurrentDateString());
    this.updateList();
    this.sub = this.store.accountBalance.subscribe(
      (data => this.hasData = data.length > 0)
    );
  }

  get data(): Observable<LedgerBalance[]> {
    return this.store.accountBalance;
  }

  updateList = () => this.store.fetchData(this.dateField.value);
}
