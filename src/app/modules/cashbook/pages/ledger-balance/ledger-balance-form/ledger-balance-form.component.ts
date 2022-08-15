import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { LedgerService } from './../../../../../shared/services/ledger/ledger.service';
import { Ledger } from './../../../../../shared/collection';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './../../../../../shared/services/notification/notification.service';
import { LedgerBalanceService } from '../ledger-balance.service';

@Component({
  selector: 'app-ledger-balance-form',
  templateUrl: './ledger-balance-form.component.html',
  styles: ['']
})
export class LedgerBalanceFormComponent implements OnInit, OnDestroy {
  myForm: UntypedFormGroup = new UntypedFormGroup({});
  private sub: Subscription = new Subscription();
  constructor(
    private fb: UntypedFormBuilder,
    private ns: NotificationService,
    private balanceStore: LedgerBalanceService,
    private ledgerService: LedgerService
  ) { }

  ngOnInit(): void {
    this.ledgerService.init();
    this.myForm = this.fb.group({
      ledger: [null, Validators.required],
      opening: [0, [Validators.required, Validators.min(0)]],
      closing: [0, [Validators.required, Validators.min(0)]]
    });

    this.sub = this.ledger.valueChanges
    .subscribe(
      (selectedLedger: Ledger) => {
        if (!!!selectedLedger) {
          return;
        }
        const ledgers = this.balanceStore.accountBalance.value;
        const ledger = ledgers.find(x => x.ledger_id === selectedLedger.id);
        if (ledger === undefined || ledger === null) {
          return;
        }
        this.myForm.patchValue({
          opening: ledger.opening,
          closing: ledger.closing
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  get ledgers(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>)
    .pipe(
      map( ledgers => ledgers.filter( x => x.kind === 'BANK' || x.kind === 'CASH'))
    );
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.ns.showError('Error', 'Invalid Form Data');
      return;
    }

    const ledger = this.ledger.value as Ledger;
    const opening = this.opening.value;
    const closing = this.closing.value;

    this.ledgerService.updateBalance(ledger.id, opening, closing)
    .subscribe(
      () => {
        this.ns.showSuccess('Success', 'Opening and Closing Balance Saved Success');
        this.myForm.reset();
      },
      error => {
        this.ns.showError('Error', error);
      }
    );
  }

  get ledger(): UntypedFormControl {
    return this.myForm.get('ledger') as UntypedFormControl;
  }

  get opening(): UntypedFormControl {
    return this.myForm.get('opening') as UntypedFormControl;
  }

  get closing(): UntypedFormControl {
    return this.myForm.get('closing') as UntypedFormControl;
  }
}
