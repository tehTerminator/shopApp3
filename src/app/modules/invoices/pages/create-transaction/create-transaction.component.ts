import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  transactionForm: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private notification: NotificationService,
    private store: InvoiceStoreService,
    private fb: FormBuilder,
    private ledgerService: LedgerService,
    private titleService: Title
  ) { }

  ngOnInit(): void {

    if (this.store.customer.id === 0) {
      this.router.navigate(['/invoices', 'create', 'select-customer']);
      return;
    }

    if (this.store.selectedItem.id === 0) {
      this.router.navigate(['/invoices', 'create', 'list-items']);
      return;
    }

    this.transactionForm = this.fb.group({
      quantity: [0, [Validators.min(1), Validators.required]],
      rate: [0, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0)], this.validateDiscount.bind(this)]
    });

    if (!this.ledgerService.isInstanceOfLedger(this.store.selectedItem)) {
      this.transactionForm.patchValue({
        rate: this.store.selectedItem.rate
      });
    }

    this.titleService.setTitle('Set Quantity And Rate | ShopApp');
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.notification.showError('Error', 'Invalid Form Data');
      return;
    }

    this.store.createTransaction(this.quantity.value, this.rate.value, this.discountPercent);
    this.router.navigate(['/invoices', 'create', 'paymentMethod']);
  }

  validateDiscount(control: AbstractControl): Promise<ValidationErrors|null> {
    const promise = new Promise<ValidationErrors|null>((resolve) => {
      const val = control.value as number;
      const totalAmount = this.grossPrice;
      if (val >= totalAmount) {
        const error: ValidationErrors = {toohigh: true};
        resolve(error);
      }
      resolve(null);
    });

    return promise;
  }

  get productName(): string {
    return this.store.selectedItem.title;
  }

  get grossPrice(): number {
    return this.quantity.value * this.rate.value;

  }

  get discountPercent(): number {
    const val = (this.discount.value / this.grossPrice) * 100;
    if (isNaN(val)) {
      return 0;
    }
    return val;
  }

  get netPrice(): number {
    return this.grossPrice - this.discount.value;
  }

  get quantity(): FormControl {
    return this.transactionForm.get('quantity') as FormControl;
  }

  get rate(): FormControl {
    return this.transactionForm.get('rate') as FormControl;
  }

  get discount(): FormControl {
    return this.transactionForm.get('discount') as FormControl;
  }
}
