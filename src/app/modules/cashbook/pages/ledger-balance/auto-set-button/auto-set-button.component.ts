import { Component } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api/api.service';
import { LedgerBalanceService } from '../ledger-balance.service';

@Component({
    selector: 'app-auto-set-buttons',
    templateUrl: './auto-set-button.component.html',
    styles: []
})
export class AutoSetButtons {

    buttonDisabled = false;

    updateBalance(): void {
        this.disableButton();
        setTimeout(() => this.enableButton(), 10000);
        this.api.update<any>('balance', {})
        .subscribe(
            (response => this.store.accountBalance.next(response))
        );
    }

    disableButton = () => this.buttonDisabled = true;
    enableButton = () => this.buttonDisabled = false;

    constructor(private api: ApiService, private store: LedgerBalanceService) {}
}
