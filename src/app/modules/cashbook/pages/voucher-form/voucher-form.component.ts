import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ApiService } from './../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Ledger, Voucher } from '../../../../shared/collection';
import { EMPTY, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { evaluateString } from '../../../../shared/functions';
import { VoucherForm } from './VoucherForm';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.css'],
})
export class VoucherFormComponent implements OnInit {
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  voucherForm = new VoucherForm();
  isLoading = false;
  filteredCreditor: Observable<Ledger[]> = EMPTY;
  filteredDebtor: Observable<Ledger[]> = EMPTY;

  constructor(
    private api: ApiService,
    private ns: NotificationService,
    private ledgerService: LedgerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.ledgerService.init();
    this.filteredCreditor = this.voucherForm.crFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(
        value => {
          if (typeof(value) === 'string'){
            return this.filteredOptions(value, 'EXPENSE')
          }

          return this.filteredOptions('', 'EXPENSE');
        }
      )
    );

    this.filteredDebtor = this.voucherForm.drFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      map(
        value => {
          if (typeof(value) === 'string'){
            return this.filteredOptions(value, 'INCOME')
          }

          return this.filteredOptions('', 'INCOME')
        }
      )
    );

    this.loadIdFromRoute();
  }

  private loadIdFromRoute(): void {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.voucherForm.idFormControl.setValue(id);
      this.onIdFieldChange();
    } catch (e) {
      this.voucherForm.idFormControl.setValue(0);
    }
  }

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.voucherForm.editMode) {
      this.api.select<Voucher>('vouchers', {
        id: this.voucherForm.id.toString(),
      }).subscribe(
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
        cr, dr, narration: voucher.narration, amount: voucher.amount
      });
    } catch (e) {
      console.log(e);
      this.ns.showError('Error', 'Error Loading Data From Server');
    }
  }

  onAmountFieldFocus(): void {
    // alert('Focused');
    try {
      const value = evaluateString(this.voucherForm.narration);
      this.voucherForm.amountFormControl.setValue(value);
    } catch (e) {
      this.voucherForm.amountFormControl.setValue(0);
    }
  }

  onSubmit(): void {
    if (this.voucherForm.invalid) {
      this.ns.showError('Form Error', 'There are some Errors in Your Form');
      return;
    }

    if (this.voucherForm.cr === this.voucherForm.dr) {
      this.ns.showError('CR DR Same', 'Giver and Receiver Cannot Be Same');
      return;
    }

    this.isLoading = true;

    const payload = this.voucherForm.value;
    payload.cr = payload.cr.id;
    payload.dr = payload.dr.id;
    let response = EMPTY;

    if (this.voucherForm.editMode) {
      response = this.api.update('vouchers', payload);
    } else {
      response = this.api.create('vouchers', payload);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<Voucher>): void {
    const word = this.voucherForm.editMode ? 'Updated' : 'Created';
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
    let t = '';
    try{
      t = title.toLowerCase();
      return ledgers.filter(x => x.kind !== kindIsNot && x.title.toLowerCase().indexOf(t) >= 0);
    }
    catch (e) {
      return ledgers.filter(x => x.kind !== kindIsNot);
    }
  }

  public displayFunction(ledger: Ledger): string {
    return ledger && ledger.title ? `${ledger.title} - ${ledger.kind}` : '';
  }

}

