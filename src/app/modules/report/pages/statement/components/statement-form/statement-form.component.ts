import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Ledger } from '../../../../../../shared/collection';
import { LedgerService } from '../../../../../../shared/services/ledger/ledger.service';
import { NotificationService } from '../../../../../../shared/services/notification/notification.service';
import { StatementService } from './../../statement.service';
import { getCurrentDateString } from '../../../../../../shared/functions';

@Component({
    selector: 'app-statement-form',
    templateUrl: './statement-form.component.html',
    styles: ['']
})
export class StatementFormComponent implements OnInit {
    ledger = new UntypedFormControl(0, [Validators.min(1), Validators.required]);
    fromDate = new UntypedFormControl('', [Validators.required]);
    toDate = new UntypedFormControl('', [Validators.required]);
    myForm = new UntypedFormGroup({});

    constructor(
      private ns: NotificationService,
      private ledgerService: LedgerService,
      private statementService: StatementService,
    ) {}


    ngOnInit(): void {
      this.myForm.addControl('fromDate', this.fromDate);
      this.myForm.addControl('toDate', this.toDate);
      this.myForm.addControl('ledger', this.ledger);
      this.ledgerService.init();

      this.fromDate.setValue(getCurrentDateString());
      this.toDate.setValue(getCurrentDateString());
    }

    onLedgerFieldClick(): void {
      this.ledger.patchValue('');
    }

    onSubmit(): void {
      if (this.myForm.invalid) {
        this.ns.showError('Error', 'Invalid Form Data');
        return;
      }
      const ledgerId = +this.ledger.value.split('-')[0];
      const ledger = this.ledgerService.getElementById(ledgerId) as Ledger;
      this.statementService.fetchData(ledger, this.fromDate.value, this.toDate.value);
    }

    get ledgers(): Observable<Ledger[]> {
      return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
    }
}
