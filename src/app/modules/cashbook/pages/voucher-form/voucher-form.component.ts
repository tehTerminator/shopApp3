import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ApiService } from './../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Ledger, Voucher } from '../../../../shared/collection';
import { EMPTY, Observable } from 'rxjs';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.css'],
  animations: [
    trigger('initialize', [
      state('in', style({
        opacity: 1,
      })),
      state('void', style({
        opacity: 0,
      })),
      transition('void => *', animate(500))
    ])
  ]
})
export class VoucherFormComponent implements OnInit {
  voucherForm: FormGroup = new FormGroup({});
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private titleService: Title,
    private ns: NotificationService,
    private ledgerService: LedgerService,
  ) { }

  ngOnInit(): void {
    this.voucherForm = this.fb.group({
      id: 0,
      cr: [0, Validators.required],
      dr: [0, Validators.required],
      narration: '',
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.ledgerService.init();
    this.titleService.setTitle('Create / Update Vouchers | ShopApp');
  }

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.id.value > 0) {
      this.api.select<Voucher>('vouchers', {
        id: this.id.value,
      }).subscribe(
        voucher => {
          this.isLoading = false;
          this.voucherForm.patchValue({
            cr: voucher.cr,
            dr: voucher.dr,
            narration: voucher.narration,
            amount: voucher.amount
          });
        },
        () => {
          this.isLoading = false;
          this.ns.showError('Error', 'Given Voucher Not Found');
          this.voucherForm.reset();
        }
      );
    } else {
      this.isLoading = false;
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

    this.isLoading = true;

    const payload = this.voucherForm.value;
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
        this.isLoading = false;
      },
      error => {
        this.ns.showError('Error', error);
        this.isLoading = false;
      }
    );
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
  }

  get creditors(): Observable<Ledger[]> {
    return this.ledgers.pipe(
      map(
        (ledgers: Ledger[]) => ledgers.filter(x => x.kind !== 'EXPENSE')
      )
    );
  }

  get debtors(): Observable<Ledger[]> {
    return this.ledgers.pipe(
      map(
        (ledgers: Ledger[]) => ledgers.filter(x => x.kind !== 'INCOME')
      )
    );
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
