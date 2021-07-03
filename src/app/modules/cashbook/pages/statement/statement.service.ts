import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cashbook } from '../../../../shared/class/Cashbook-Transaction.model';
import { Ledger, Voucher } from '../../../../shared/collection';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable()
export class StatementService {
    cashbook: BehaviorSubject<Cashbook> = new BehaviorSubject( new Cashbook(emptyLedger, []));

    constructor(private api: ApiService) { }

    fetchData(ledger: Ledger, fromDate: string, toDate: string): void {
        this.api
        .select<{openingBalance: number, vouchers: Voucher[]}>('vouchers', {ledger: ledger.id.toString() , fromDate, toDate})
        .subscribe(
            data => {
                const newCashbook = new Cashbook(ledger, data.vouchers, data.openingBalance);
                this.cashbook.next(newCashbook);
            },
            error => {
                console.error(error);
                const newCashbook = new Cashbook(ledger, []);
                this.cashbook.next(newCashbook);
            }
        );
    }
}

const emptyLedger: Ledger = {
    id: 0,
    title: '',
    kind: '',
    balance: [],
    created_at: '',
    updated_at: ''
};
