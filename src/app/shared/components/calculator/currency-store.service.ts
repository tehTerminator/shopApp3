import { Injectable } from '@angular/core';
import { Currency } from './currency.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyStoreService {
    currencyArray = new BehaviorSubject<Currency[]>([]);

    addCurrency(denomination: number, count: number): void {
        const currencyArray = this.currencyArray.value;
        const currency = currencyArray.find((x: Currency) => x.denomination === denomination);
        if (currency === undefined || currency === null) {
            currencyArray.push(new Currency(denomination, count));
            currencyArray.sort((a: Currency, b: Currency) => a.denomination - b.denomination);
        } else {
            currency.count += count;
        }
        this.currencyArray.next(currencyArray);
    }

    reset(): void {
        this.currencyArray.next([]);
    }

    delete(index: number): void {
        const currencyArray = this.currencyArray.value;
        currencyArray.splice(index, 1);
        this.currencyArray.next(currencyArray);
    }
}
