import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  calcForm: FormGroup = this.fb.group({
    command: ['', Validators.pattern(mathPattern)],
    denomination: 0,
    count: 0
  });
  CurrencyArray: Currency[] = [];
  readonly denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500, 2000];
  result = 0;
  sub: Subscription = new Subscription();
  previousCalculatorCommand = 'Enter Expression to Calculate';
  filteredOptions: Observable<number[]> = from([]);
  // @ViewChild('denominatorField') denominatorField: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.CurrencyArray = [];
    this.sub = this.command.valueChanges
    .subscribe((value: string) => {
      const regex = new RegExp(mathPattern);
      const lastChar = value[value.length - 1];
      if (lastChar === '=') {
        const command = value.substr(0, value.length - 1);
        if (regex.test(command)) {
          this.previousCalculatorCommand = `Evaluating : ${command}`;
          this.calcForm.patchValue({command: eval(command)});
        } else {
          this.calcForm.patchValue({command: 'Invalid Expression'});
        }
      }
    });
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  addCurrency(): void {
    const denomination = this.denomination.value;
    const count = this.count.value;

    const currency = this.CurrencyArray.find(x => x.denomination === denomination);
    if (currency === undefined) {
      this.CurrencyArray.push( new Currency(denomination, count));
      this.CurrencyArray.sort((a, b) => a.denomination - b.denomination);
    } else {
      currency.count = count;
    }
  }

  resetCurrency(): void {
    this.CurrencyArray = [];
  }

  get command(): FormControl {
    return this.calcForm.get('command') as FormControl;
  }

  get denomination(): FormControl {
    return this.calcForm.get('denomination') as FormControl;
  }

  get count(): FormControl {
    return this.calcForm.get('count') as FormControl;
  }

  get currencyTotal(): number {
    let total = 0;
    this.CurrencyArray.forEach(item => {
      total += item.amount;
    });
    return total;
  }
}

class Currency {
  constructor(private theDenomination: number, public count: number) {}

  get amount(): number {
    return this.denomination * this.count;
  }

  get denomination(): number {
    return this.theDenomination;
  }
}

const mathPattern = '^([1-9][0-9]*[\\.+\\-*\\/])*[1-9][0-9]*$';
