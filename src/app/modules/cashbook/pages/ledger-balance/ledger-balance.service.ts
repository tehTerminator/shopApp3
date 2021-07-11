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

    constructor(private api: ApiService, private ns: NotificationService) {}
}

export interface LedgerBalance extends TableRow {
    ledger: Ledger;
    ledger_id: number;
    opening: number;
    closing: number;
}
