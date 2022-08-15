import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { CurrencyStoreService } from '../currency-store.service';
import { ValidateDenomiation } from './deno-validator';

@Component({
    selector: 'app-currency-form',
    templateUrl: './currency-form.component.html',
    styles: ['']
})
export class CurrencyFormComponent {
    calcForm: UntypedFormGroup = this.fb.group({
        denomination: [0, [Validators.required, ValidateDenomiation]],
        count: [0, [Validators.required, Validators.min(1)]]
    });
    @ViewChild('denoField') denoField: ElementRef<HTMLInputElement> | null = null;

    addCurrency(): void {
        const denomination = this.denomination.value;
        const count = this.count.value;
        this.store.addCurrency(denomination, count);
        this.calcForm.reset();
        if (this.denoField !== null) {
            this.denoField.nativeElement.focus();
        }
    }

    get denomination(): UntypedFormControl {
        return this.calcForm.get('denomination') as UntypedFormControl;
    }

    get count(): UntypedFormControl {
        return this.calcForm.get('count') as UntypedFormControl;
    }

    constructor(private fb: UntypedFormBuilder, private store: CurrencyStoreService) { }
}
