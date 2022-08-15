import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from '../../../../../../shared/collection';
import { CustomerService } from '../../../../services/customer.service';
import { SearchInvoiceStoreService } from '../../search-invoice-store.service';

@Component({
    templateUrl: './search-by-customer.component.html',
    selector: 'app-search-by-customer'
})
export class SearchByCustomerComponent implements OnInit {
    searchForm: UntypedFormGroup = this.fb.group({
        customer: ['', Validators.required],
        month: [null, Validators.required],
        paymentStatus: [0, Validators.required]
    });

    constructor(
        private customerService: CustomerService,
        private store: SearchInvoiceStoreService,
        private fb: UntypedFormBuilder
    ) {}

    ngOnInit(): void {
        this.customerService.init();
    }

    onSubmit(): void {
        this.store.fetchUsingCustomerId(this.customerId, this.month, this.paymentStatus);
    }

    get customerId(): number {
        return this.customerFormControl.value.split('-')[0];
    }

    get month(): string {
        return this.monthFormControl.value;
    }

    get paymentStatus(): string {
        return this.paymentStatusFormControl.value;
    }

    get customers(): Observable<Customer[]> {
        return this.customerService.getAsObservable() as Observable<Customer[]>;
    }

    get customerFormControl(): UntypedFormControl {
        return this.searchForm.get('customer') as UntypedFormControl;
    }

    get monthFormControl(): UntypedFormControl {
        return this.searchForm.get('month') as UntypedFormControl;
    }

    get paymentStatusFormControl(): UntypedFormControl {
        return this.searchForm.get('paymentStatus') as UntypedFormControl;
    }
}
