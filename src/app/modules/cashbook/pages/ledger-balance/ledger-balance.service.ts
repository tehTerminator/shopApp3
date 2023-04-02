import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ledger, TableRow } from '../../../../shared/collection';
import { ApiService } from '../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';


@Injectable({
    providedIn: 'root'
})
export class LedgerBalanceService {
    accountBalance = new BehaviorSubject<LedgerBalance[]>([]);

    fetchData(date: string): void {
        this.api.select<LedgerBalance[]>('balance', {date})
        .subscribe(
            (data => this.accountBalance.next(data)),
            () => this.ns.show('Error', 'Unable to Fetch Data')
        );
    }

    updateBalance(id: number, opening: number, closing: number) {
        console.log('Update Balance Called', id, opening, closing);
        const oldList = this.accountBalance.value;
        const index = oldList.findIndex(x=> x.ledger_id === id);
        
        console.log('Index of Item Found', index);
        if (index < 0 ) {
            return;
        }

        oldList[index].opening = opening;
        oldList[index].closing = closing;

        this.accountBalance.next(oldList);
    }

    constructor(private api: ApiService, private ns: NotificationService) {}
}

export interface LedgerBalance extends TableRow {
    ledger: Ledger;
    ledger_id: number;
    opening: number;
    closing: number;
}
