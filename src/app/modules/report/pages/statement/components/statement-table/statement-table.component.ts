import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CashbookRow } from '../../../../../../shared/class/Cashbook-Transaction.model';
import { StatementService } from '../../statement.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-statement-table',
    templateUrl: './statement-table.component.html',
    styleUrls: ['./statement-table.component.css']
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

    splitText(narration: string): string[] {
        if (narration.indexOf('#') >= 0){
            const sp = narration.split('#');
            if (sp.length === 2 && !isNaN(+sp[1])) {
                return sp;
            }
        }
        return [narration, ''];
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

