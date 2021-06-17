import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyStoreService } from '../currency-store.service';
import { Currency } from '../currency.model';

@Component({
    selector: 'app-currency-table',
    templateUrl: './currency-table.component.html',
    styles: ['']
})
export class CurrencyTableComponent {

    deleteItem = (index: number) => this.store.delete(index);
    resetCurrency = () => this.store.reset();

    get currencyTotal(): number {
        const currencyArray = this.currencyArray.value;
        let total = 0;
        currencyArray.forEach(item => {
            total += item.amount;
        });
        return total;
    }

    get currencyArray(): BehaviorSubject<Currency[]> {
        return this.store.currencyArray;
    }

    constructor(private store: CurrencyStoreService) { }
}
