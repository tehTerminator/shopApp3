import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './../../../../../shared/services/api/api.service';
import { Voucher } from '../../../../../shared/collection';

@Injectable()
export class DayBookService {
    private _loading = false;
    dayBook = new BehaviorSubject<Voucher[]>([]);

    fetchData(date: string): void {
        this._loading = true;
        this.api.select<Voucher[]>('day-book', { date })
            .subscribe(
                (data => {
                    this.dayBook.next(data);
                }),
                (err) => console.error(err),
                () => this._loading = false
            );
    }

    get loading(): boolean {
        return this._loading;
    }

    constructor(private api: ApiService) { }
}