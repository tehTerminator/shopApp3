import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { Currency } from './currency.model';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  calcForm: FormGroup = this.fb.group({
    denomination: 0,
    count: 0
  });
  currencyArray: Currency[] = [];
  readonly denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];
  result = 0;
  sub: Subscription = new Subscription();
  filteredOptions: Observable<number[]> = from([]);

  addCurrency(): void {
    const denomination = this.denomination.value;
    const count = this.count.value;

    const currency = this.currencyArray.find(x => x.denomination === denomination);
    console.log('Currency', currency);
    if (currency === undefined || currency === null) {
      this.currencyArray.push( new Currency(denomination, count));
      this.currencyArray.sort((a, b) => a.denomination - b.denomination);
    } else {
      currency.count += count;
    }
  }

  get denomination(): FormControl {
    return this.calcForm.get('denomination') as FormControl;
  }

  get count(): FormControl {
    return this.calcForm.get('count') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

}

