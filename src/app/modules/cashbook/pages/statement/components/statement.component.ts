import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Ledger, Voucher } from '../../../../../shared/collection';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../../shared/services/notification/notification.service';
import { LedgerService } from '../../../../../shared/services/ledger/ledger.service';
import { Cashbook, CashbookRow } from '../../../../../shared/class/Cashbook-Transaction.model';

@Component({
  selector: 'app-statement',
  template: `
    <app-statement-form></app-statement-form>
    <app-statement-table><app-statement-table>
  `,
  styles: ['']
})
export class StatementComponent { }
