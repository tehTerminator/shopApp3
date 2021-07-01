import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateDenomiation(control: AbstractControl): ValidationErrors | null {
    const error: ValidationErrors = {invalidDenomination: true};
    const denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];
    const value = +control.value;

    if (denominations.indexOf(value) >= 0) {
        return null;
    }
    return error;
}
