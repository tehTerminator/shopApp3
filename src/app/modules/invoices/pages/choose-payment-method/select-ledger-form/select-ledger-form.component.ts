import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ledger } from '../../../../../shared/collection';
import { LedgerService } from '../../../../../shared/services/ledger/ledger.service';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
    selector: 'app-select-ledger-form',
    templateUrl: './select-ledger-form.component.html',
    styles: []
})
export class SelectLedgerFormComponent {
    paymentMethodForm = this.fb.group({
        paymentMethod: [null, Validators.required]
    });
    constructor(
        private ledgerService: LedgerService,
        private store: InvoiceStoreService,
        private fb: FormBuilder,
        private router: Router) { }

    get ledgers(): Observable<Ledger[]> {
        return (this.ledgerService.getAsObservable() as Observable<Ledger[]>)
            .pipe(map(
                ledgers => ledgers.filter(
                    x => x.kind === 'BANK' || x.kind === 'CASH'
                )
            )
            );
    }

    selectPaymentMethod(ledger: Ledger): void {
        this.store.paymentMethod = `${ledger.title}#${ledger.id}`;
        this.recentPaymentMethod = ledger;
        this.store.paid = true;
        this.router.navigate(['/invoices', 'wait']);
    }

    onSubmit(): void {
        const paymentMethod = this.paymentMethodForm.get('paymentMethod') as FormControl;
        const ledger = paymentMethod.value as Ledger;

        if (paymentMethod.invalid) {
            return;
        }
        this.selectPaymentMethod(ledger);
    }

    set recentPaymentMethod(ledger: Ledger | null) {
        if (ledger !== null) {
            localStorage.setItem('recentPaymentMethod', JSON.stringify(ledger));
        }
    }
}
