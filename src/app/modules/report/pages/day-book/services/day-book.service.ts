import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './../../../../../shared/services/api/api.service';

@Injectable()
export class DayBookService {
    dayBook = new BehaviorSubject<Entry[]>([]);
    fetchData(date: string): void {
        this.api.select<Entry[]>('day-book', { date })
            .subscribe(
                (data => {
                    this.dayBook.next(data);
                })
            );
    }

    constructor(private api: ApiService) { }
}

export interface Entry {
    creditor: string;
    debtor: string;
    amount: number;
}
