import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ApiService } from './../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Ledger, Voucher } from '../../../../shared/collection';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { evaluateString } from '../../../../shared/functions';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.css'],
})
export class VoucherFormComponent implements OnInit {
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  voucherForm: FormGroup;
  isLoading = false;
  filteredCreditor: Observable<Ledger[]> = EMPTY;
  filteredDebtor: Observable<Ledger[]> = EMPTY;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private ns: NotificationService,
    private ledgerService: LedgerService,
    private route: ActivatedRoute
  ) {
    this.voucherForm = this.fb.group({
      id: [0],
      cr: [0, Validators.required],
      dr: [0, Validators.required],
      narration: ['', [Validators.required, Validators.minLength(3)]],
      amount: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.ledgerService.init();
    this.filteredCreditor = this.cr.valueChanges.pipe(
      startWith(''),
      map(value => this.filteredOptions(value, 'EXPENSE'))
    );

    this.filteredDebtor = this.dr.valueChanges.pipe(
      startWith(''),
      map(value => this.filteredOptions(value, 'INCOME'))
    );

    this.loadIdFromRoute();
  }

  private loadIdFromRoute(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || null;
    this.id.setValue(id);
    if (id) {
      this.onIdFieldChange();
    }
  }

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.id.value > 0) {
      this.api.select<Voucher>('vouchers', { id: this.id.value }).subscribe(
        voucher => {
          this.isLoading = false;
          this.updateFormData(voucher);
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

  private updateFormData(voucher: Voucher): void {
    try {
      console.log(voucher);
      console.table(this.ledgerService.getAsList());
      const cr = this.ledgerService.getElementById(voucher.cr);
      const dr = this.ledgerService.getElementById(voucher.dr);

      this.voucherForm.patchValue({
        cr,
        dr,
        narration: voucher.narration,
        amount: voucher.amount
      });
    } catch (e) {
      console.log(e);
      this.ns.showError('Error', 'Error Loading Data From Server');
    }
  }

  onAmountFieldFocus(): void {
    try {
      const value = evaluateString(this.narration.value);
      this.amount.setValue(value);
    } catch (e) {
      this.amount.setValue(0);
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

    const payload = { ...this.voucherForm.value };
    payload.cr = payload.cr.id;
    payload.dr = payload.dr.id;

    const response = this.editMode
      ? this.api.update<Voucher>('vouchers', payload)
      : this.api.create<Voucher>('vouchers', payload);

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
        this.input.nativeElement.focus();
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

  public filteredOptions(title: string, kindIsNot: string): Ledger[] {
    const ledgers = this.ledgerService.getAsList() as Ledger[];
    const t = title.toLowerCase();
    return ledgers.filter(x => x.kind !== kindIsNot && x.title.toLowerCase().indexOf(t) >= 0);
  }

  public displayFunction(ledger: Ledger): string {
    return ledger && ledger.title ? `${ledger.title} - ${ledger.kind}` : '';
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