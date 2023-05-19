import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './../../../../../shared/services/api/api.service';
import { Voucher } from '../../../../../shared/collection';
import { map } from 'rxjs/operators';

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

    getFileteredData(cr: string, dr: string): Observable<Voucher[]> {
        return this.dayBook.pipe(
            map((dayBook) => {
              const filteredData = dayBook.filter((entry) => {
                const creditorKinds = cr.split(',');
                const debtorKinds = dr.split(',');
                return creditorKinds.includes(entry.creditor.kind) && debtorKinds.includes(entry.debtor.kind);
              });
              return filteredData;
            })
          );
    }

    get loading(): boolean {
        return this._loading;
    }

    constructor(private api: ApiService) { }
}