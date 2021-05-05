import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Ledger, Voucher } from '../../../../shared/collection';
import { ApiService } from '../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { LedgerService } from '../../../../shared/services/ledger/ledger.service';
import { Cashbook, CashbookRow } from '../../../../shared/class/Cashbook-Transaction.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ledger = new FormControl(0, [Validators.min(1), Validators.required]);
  date = new FormControl('', [Validators.required]);
  myForm = new FormGroup({});
  cashbook = new Cashbook({
    id: 0,
    title: '',
    kind: '',
    balance: [],
    created_at: '',
    updated_at: '',
  }, []);


  constructor(
    private ledgerService: LedgerService,
    private api: ApiService,
    private ns: NotificationService) { }

  ngOnInit(): void {
    this.myForm.addControl('date', this.date);
    this.myForm.addControl('ledger', this.ledger);
    this.ledgerService.init();
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.ns.showError('Error', 'Invalid Form Data');
      return;
    }

    const response = this.api.select<Voucher[]>('vouchers', {
    ledger: this.ledger.value.id,
      date: this.date.value
    });

    this.handleResponse(response);
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
  }

  private handleResponse(response: Observable<Voucher[]>): void {
    response.subscribe(
      data => {
        this.cashbook = new Cashbook(this.ledger.value, data);
      },
      error => {
        this.ns.showError('Error', 'Unable to Fetch Data');
        console.log(error);
        this.cashbook = new Cashbook(this.ledger.value, []);
      }
    );
  }

  get rows(): CashbookRow[] {
    return this.cashbook.rows;
  }

}
