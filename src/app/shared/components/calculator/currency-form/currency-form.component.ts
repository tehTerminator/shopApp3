import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CurrencyStoreService } from '../currency-store.service';

@Component({
    selector: 'app-currency-form',
    templateUrl: './currency-form.component.html',
    styles: ['']
})
export class CurrencyFormComponent {
    calcForm: FormGroup = this.fb.group({
        denomination: 0,
        count: 0
    });
    readonly denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];

    addCurrency(): void {
        const denomination = this.denomination.value;
        const count = this.count.value;

        this.store.addCurrency(denomination, count);
        this.calcForm.reset();
    }

    get denomination(): FormControl {
        return this.calcForm.get('denomination') as FormControl;
    }

    get count(): FormControl {
        return this.calcForm.get('count') as FormControl;
    }

    constructor(private fb: FormBuilder, private store: CurrencyStoreService) { }
}
