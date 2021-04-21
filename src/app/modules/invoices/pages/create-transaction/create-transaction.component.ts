import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { PosItemService } from './../../../../shared/services/posItem/pos-item.service';

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
    private posItemService: PosItemService
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      quantity: [0, [Validators.min(1), Validators.required]],
      rate: [0, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0), Validators.max(100)]]
    });

    if (!this.ledgerService.isInstanceOfLedger(this.store.selectedItem)) {
      this.transactionForm.patchValue({
        rate: this.store.selectedItem.rate
      });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.notification.showError('Error', 'Invalid Form Data');
      return;
    }

    this.store.createTransaction(this.quantity.value, this.rate.value, this.discount.value);
    this.router.navigate(['/invoices', 'paymentMethod']);
  }

  isDiscountAllowed(): boolean {
    if (this.ledgerService.isInstanceOfLedger(this.store.selectedItem)) {
      return false;
    }

    if (this.posItemService.isInstanceOfPosItem(this.store.selectedItem)) {
      return false;
    }
    return true;
  }

  get productName(): string {
    return this.store.selectedItem.title;
  }

  get grossPrice(): number {
    return this.netPrice - this.discountedAmount;
  }

  get discountedAmount(): number {
    return this.netPrice * this.discount.value / 100;
  }

  get netPrice(): number {
    return this.quantity.value * this.rate.value;
  }

  get quantity(): FormControl {
    return this.transactionForm.get('quantity') as FormControl
  }

  get rate(): FormControl {
    return this.transactionForm.get('rate') as FormControl
  }

  get discount(): FormControl {
    return this.transactionForm.get('discount') as FormControl
  }
}
