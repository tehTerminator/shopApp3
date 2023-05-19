import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DayBookService} from '../../services/day-book.service';
import { Voucher } from '../../../../../../shared/collection';

@Component({
    selector: 'app-day-book-table',
    templateUrl: './day-book-table.component.html'
})
export class DayBookTableComponent {
    @Input('creditor') creditor = '';
    @Input('debtor') debtor = '';

    constructor(private dayBookService: DayBookService) {}

    get dayBook(): Observable<Voucher[]> {
        return this.dayBookService.getFileteredData(this.creditor, this.debtor);
    }
}
