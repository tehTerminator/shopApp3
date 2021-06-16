import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    ledger = new FormControl(0, [Validators.min(1), Validators.required]);
    date = new FormControl('', [Validators.required]);
    myForm = new FormGroup({});

    constructor(
      private ns: NotificationService,
      private ledgerService: LedgerService,
      private statementService: StatementService
    ) {}


    ngOnInit(): void {
      this.myForm.addControl('date', this.date);
      this.myForm.addControl('ledger', this.ledger);
      this.ledgerService.init();

      this.date.setValue(getCurrentDateString());
    }

    onSubmit(): void {
      if (this.myForm.invalid) {
        this.ns.showError('Error', 'Invalid Form Data');
        return;
      }

      this.statementService.fetchData(this.ledger.value, this.date.value);
    }

    get ledgers(): Observable<Ledger[]> {
      return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
    }
}
