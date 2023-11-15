import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ledger } from '../../../../shared/collection';

export class VoucherForm extends FormGroup {
  constructor() {
    super({
      id: new FormControl<number>(0),
      cr: new FormControl<Ledger | null>(null, Validators.required),
      dr: new FormControl<Ledger | null>(null, Validators.required),
      narration: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      amount: new FormControl<number>(0, [Validators.required, Validators.min(0.01)])
    });
  }

  get editMode(): boolean {
    return this.id > 0;
  }

  get idFormControl(): FormControl<number> {
    return this.get('id') as FormControl<number>;
  }

  get crFormControl(): FormControl<Ledger | null> {
    return this.get('cr') as FormControl<Ledger | null>;
  }
  get drFormControl(): FormControl<Ledger | null> {
    return this.get('dr') as FormControl<Ledger | null>;
  }
  get narrationFormControl(): FormControl<string> {
    return this.get('narration') as FormControl<string>;
  }
  get amountFormControl(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get id(): number {
    return this.idFormControl.value;
  }

  get cr(): Ledger | null {
    return this.crFormControl.value;
  }
  get dr(): Ledger | null {
    return this.drFormControl.value;
  }
  get narration(): string {
    return this.narrationFormControl.value;
  }
  get amount(): number {
    return this.amountFormControl.value;
  }

}
