import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
    selector: 'app-udhaar-payment-btn',
    template: `
        <section class="card mt-2">
            <div class="card-header">Payment Not Received</div>
            <div class="card-body">
            <button class="btn btn-danger w-100 mt-2" (click)="setUdhaar()">
                Udhaar
            </button>
            </div>
        </section>
  `,
    styles: []
})
export class UdhaarPaymentBtnComponent {

    constructor(
        private store: InvoiceStoreService,
        private router: Router
    ) {}

    setUdhaar(): void {
        this.store.paymentMethod = 0;
        this.store.paid = false;
        this.router.navigate(['/invoices', 'wait']);
      }
}
