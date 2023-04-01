import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ledger } from '../../../../../shared/collection';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
    selector: 'app-recent-payment-btn',
    templateUrl: './recent-payment-btn.component.html',
    styles: []
})
export class RecentPaymentBtnComponent {
    constructor(
        private store: InvoiceStoreService,
        private router: Router
    ) { }

    selectPaymentMethod(ledger: Ledger): void {
        this.store.paymentMethod = ledger.id;
        this.store.paid = true;
        this.router.navigate(['/invoices', 'wait']);
    }

    get recentPaymentMethod(): Ledger | null {
        const recent = localStorage.getItem('recentPaymentMethod');
        if (recent !== null) {
            return JSON.parse(recent);
        }
        return null;
    }
}
