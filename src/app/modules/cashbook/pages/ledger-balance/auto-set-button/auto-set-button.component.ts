import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Ledger } from '../../../../../shared/collection';
import { LedgerService } from '../../../../../shared/services/ledger/ledger.service';

@Component({
    selector: 'app-auto-set-buttons',
    templateUrl: './auto-set-button.component.html',
    styles: []
})
export class AutoSetButtons implements OnInit {
    idList: number[] = [];
    private cursor = 0;
    private initialized = false;

    ngOnInit(): void {
        this.fetchUniqueId();
    }

    private fetchUniqueId(): void {
        const ledgers = this.ledgerService.getAsList() as Ledger[];
        const bankAndCash = ledgers.filter(
            item => item.kind === 'BANK' || item.kind === 'CASH'
        );
        bankAndCash.forEach(item => {
            this.idList.push(item.id);
        });

        this.initialized = this.idList.length > 0;
    }

    setOpening(): void {

        if (!confirm('Are You Sure?')) {
            return;
        }

        if (!this.initialized) {
            this.fetchUniqueId();
        }

        if (this.idList.length === 0) {
            return;
        }

        if (this.cursor === this.idList.length) {
            return;
        }

        this.ledgerService.updateBalance(this.idList[this.cursor])
        .pipe(retry(2))
        .subscribe(
            () => { this.cursor++; this.setOpening(); }
        );
    }

    get ledgers(): Observable<Ledger[]> {
        return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
    }

    constructor(private ledgerService: LedgerService) {}
}
