import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LedgerBalance, LedgerBalanceService } from '../ledger-balance.service';
import { getCurrentDateString } from './../../../../../shared/functions';

@Component({
  selector: 'app-ledger-balance-list',
  templateUrl: './ledger-balance-list.component.html',
  styles: ['']
})
export class LedgerBalanceListComponent implements OnInit {
  dateField = new FormControl();
  constructor(private store: LedgerBalanceService) { }

  ngOnInit(): void {
    this.dateField.setValue(getCurrentDateString());
  }

  get data(): Observable<LedgerBalance[]> {
    return this.store.accountBalance;
  }
  updateList = () => this.store.fetchData(this.dateField.value);
}
