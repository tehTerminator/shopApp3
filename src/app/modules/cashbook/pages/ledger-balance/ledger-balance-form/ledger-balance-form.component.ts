import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LedgerService } from './../../../../../shared/services/ledger/ledger.service';
import { Ledger } from './../../../../../shared/collection';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './../../../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-ledger-balance-form',
  templateUrl: './ledger-balance-form.component.html',
  styleUrls: ['./ledger-balance-form.component.css']
})
export class LedgerBalanceFormComponent implements OnInit, OnDestroy {
  myForm: FormGroup = new FormGroup({});
  private sub: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private ledgerService: LedgerService,
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
        const ledger = this.ledgerService.getElementById(selectedLedger.id) as Ledger;
        if (ledger.balance.length === 0) {
          return;
        } else {
          this.myForm.patchValue({
            opening: ledger.balance[0].opening,
            closing: ledger.balance[0].closing
          });
        }
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

  get ledger(): FormControl {
    return this.myForm.get('ledger') as FormControl;
  }

  get opening(): FormControl {
    return this.myForm.get('opening') as FormControl;
  }

  get closing(): FormControl {
    return this.myForm.get('closing') as FormControl;
  }
}
