import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CashbookRow } from '../../../../../../shared/class/Cashbook-Transaction.model';
import { StatementService } from '../../statement.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-statement-table',
    templateUrl: './statement-table.component.html',
    styles: ['']
})
export class StatementTableComponent implements OnInit, OnDestroy {
    rowCount = 0;
    sub: Subscription = new Subscription();

    constructor(private statementService: StatementService) { }

    ngOnInit(): void {
        this.sub = this.statementService.cashbook
            .subscribe(
                data => {
                    if (!!data) {
                        this.rowCount = data.rows.length;
                    } else {
                        this.rowCount = 0;
                    }
                }
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    get rows(): Observable<CashbookRow[]> {
        return this.statementService.cashbook
            .pipe(map(cashbook => {
                return cashbook.rows;
            }));
    }
}
