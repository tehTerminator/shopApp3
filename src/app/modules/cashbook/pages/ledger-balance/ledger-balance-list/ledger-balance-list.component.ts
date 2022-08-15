import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LedgerBalance, LedgerBalanceService } from '../ledger-balance.service';
import { getCurrentDateString } from './../../../../../shared/functions';

@Component({
  selector: 'app-ledger-balance-list',
  templateUrl: './ledger-balance-list.component.html',
  styles: ['']
})
export class LedgerBalanceListComponent implements OnInit, OnDestroy {
  dateField = new UntypedFormControl();
  hasData = false;
  totalOpening = 0;
  totalClosing = 0;
  private $notify = new Subject();
  constructor(private store: LedgerBalanceService) { }

  ngOnDestroy(): void {
    this.$notify.next();
    this.$notify.complete();
  }

  ngOnInit(): void {
    this.dateField.setValue(getCurrentDateString());
    this.updateList();
    this.store.accountBalance
    .pipe(takeUntil(this.$notify))
    .subscribe((data => {
      this.hasData = data.length > 0;
      this.totalOpening = 0;
      this.totalClosing = 0;

      data.forEach(item => {
        this.totalOpening += item.opening;
        this.totalClosing += item.closing;
      });
    }));
  }

  get data(): Observable<LedgerBalance[]> {
    return this.store.accountBalance;
  }


  updateList = () => this.store.fetchData(this.dateField.value);
}
