import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './../../../../../shared/services/api/api.service';
import { Voucher } from '../../../../../shared/collection';

@Injectable()
export class DayBookService {
    dayBook = new BehaviorSubject<Voucher[]>([]);
    fetchData(date: string): void {
        this.api.select<Voucher[]>('day-book', { date })
            .subscribe(
                (data => {
                    this.dayBook.next(data);
                })
            );
    }

    constructor(private api: ApiService) { }
}