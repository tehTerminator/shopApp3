import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cashbook } from '../../../../shared/class/Cashbook-Transaction.model';
import { Ledger, Voucher } from '../../../../shared/collection';
import { ApiService } from '../../../../shared/services/api/api.service';

@Injectable()
export class StatementService {
    cashbook: BehaviorSubject<Cashbook> = new BehaviorSubject( new Cashbook(emptyLedger, []));

    constructor(private api: ApiService) { }

    fetchData(ledger: Ledger, date: string): void {
        this.api
        .select<Voucher[]>('vouchers', {ledger: ledger.id.toString() , date})
        .subscribe(
            vouchers => {
                const newCashbook = new Cashbook(ledger, vouchers);
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
