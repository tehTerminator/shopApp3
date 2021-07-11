import { Component } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { LedgerBalanceService } from '../ledger-balance.service';

@Component({
    selector: 'app-auto-set-buttons',
    templateUrl: './auto-set-button.component.html',
    styles: []
})
export class AutoSetButtons {

    updateBalance(): void {
        this.api.update<any>('balance', {})
        .subscribe(
            (response => this.store.accountBalance.next(response))
        );
    }
    constructor(private api: ApiService, private store: LedgerBalanceService) {}
}
