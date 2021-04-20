import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ApiService } from './../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Ledger, Voucher } from '../../../../shared/collection';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.css']
})
export class VoucherFormComponent implements OnInit {
  voucherForm: FormGroup = new FormGroup({});

  constructor(
    private ns: NotificationService,
    private api: ApiService,
    private ledgerService: LedgerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.voucherForm = this.fb.group({
      id: 0,
      cr: [0, Validators.required],
      dr: [0, Validators.required],
      narration: '',
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.ledgerService.init();
  }

  onIdFieldChange(): void {
    if (this.id.value > 0) {
      this.api.select<Voucher>('vouchers', {
        id: this.id.value,
      }).subscribe(
        voucher => {
          this.voucherForm.patchValue({
            cr: voucher.cr,
            dr: voucher.dr,
            narration: voucher.narration,
            amount: voucher.amount
          });
        },
        () => {
          this.ns.showError('Error', 'Given Voucher Not Found');
          this.voucherForm.reset();
        }
      );
    }
  }

  onSubmit(): void {
    if (this.voucherForm.invalid) {
      this.ns.showError('Form Error', 'There are some Errors in Your Form');
      return;
    }

    if (this.cr.value === this.dr.value) {
      this.ns.showError('CR DR Same', 'Giver and Receiver Cannot Be Same');
      return;
    }

    const payload: Voucher = {
      ...this.voucherForm.value,
      created_at: '',
      updated_at: '',
      user_id: 0,
      creditor: {
        id: 0,
        title: '',
        group: '',
        created_at: '',
        updated_at: '',
      },
      debtor: {
        id: 0,
        title: '',
        group: '',
        created_at: '',
        updated_at: '',
      }
    };

    let response = EMPTY;

    if (this.editMode) {
      response = this.api.update('vouchers', payload);
    } else {
      response = this.api.create('vouchers', payload);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Voucher>): void {
    const word = this.editMode ? 'Updated' : 'Created';
    const successMessage = `Voucher ${word} successfully`;

    response.subscribe(
      () => {
        this.ns.showSuccess(word, successMessage);
        this.voucherForm.reset();
      },
      error => {
        this.ns.showError('Error', error);
      }
    );
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
  }

  get editMode(): boolean {
    return this.id.value > 0;
  }

  get id(): FormControl {
    return this.voucherForm.get('id') as FormControl;
  }

  get cr(): FormControl {
    return this.voucherForm.get('cr') as FormControl;
  }

  get dr(): FormControl {
    return this.voucherForm.get('dr') as FormControl;
  }

  get narration(): FormControl {
    return this.voucherForm.get('narration') as FormControl;
  }

  get amount(): FormControl {
    return this.voucherForm.get('amount') as FormControl;
  }
}
