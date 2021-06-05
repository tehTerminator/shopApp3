import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from '../currency.model';

@Component({
    selector: 'app-currency-table',
    templateUrl: './currency-table.component.html',
    styles: ['']
})
export class CurrencyTableComponent implements OnChanges {
    @Input() currencyArray: Currency[] = [];

    deleteItem(index: number): void {
        this.currencyArray.splice(index, 1);
    }

    resetCurrency(): void {
        this.currencyArray = [];
    }

    get currencyTotal(): number {
        let total = 0;
        this.currencyArray.forEach(item => {
            total += item.amount;
        });
        return total;
    }


    ngOnChanges(changes: SimpleChanges): void {
        const change = changes.currencyArray;
        if (change.currentValue !== change.previousValue) {
            this.currencyArray = change.currentValue as Currency[];
        }
    }

    constructor() { }
}
