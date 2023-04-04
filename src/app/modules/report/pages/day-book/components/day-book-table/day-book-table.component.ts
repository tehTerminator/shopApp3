import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DayBookService} from '../../services/day-book.service';
import { Voucher } from '../../../../../../shared/collection';

@Component({
    selector: 'app-day-book-table',
    templateUrl: './day-book-table.component.html'
})
export class DayBookTableComponent {
    constructor(private dayBookService: DayBookService) {}

    get dayBook(): BehaviorSubject<Voucher[]> {
        return this.dayBookService.dayBook;
    }

    get length(): number {
        return this.dayBookService.dayBook.value.length;
    }
}
