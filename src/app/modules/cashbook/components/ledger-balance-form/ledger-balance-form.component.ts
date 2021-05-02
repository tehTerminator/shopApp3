import { Component, OnInit } from '@angular/core';
import { LedgerBalanceService } from '../../services/ledger-balance.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { Ledger } from '../../../../shared/collection';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-ledger-balance-form',
  templateUrl: './ledger-balance-form.component.html',
  styleUrls: ['./ledger-balance-form.component.css']
})
export class LedgerBalanceFormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private ledgerService: LedgerService,
    private service: LedgerBalanceService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      ledger: [null, Validators.required],
      opening: [0, Validators.required],
      closing: [0, Validators.required]
    });
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

    this.service.saveBalance(ledger, opening, closing)
    .subscribe(
      () => {
        this.ns.showSuccess('Success', 'Opening and Closing Balance Saved Success');
        this.myForm.reset();
      },
      error => {
        this.ns.showError('Error', 'Unable to Set Opening or Closing Balance');
        return;
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
