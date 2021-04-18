import { Injectable } from '@angular/core';
import { BaseService } from '../../class/BaseService';
import { Ledger, MINUTE } from '../../collection';
import { ApiService } from './../api/api.service';
import { NotificationService } from './../notification/notification.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService {
  constructor(private api: ApiService, private notification: NotificationService) {
    super('ledgers', 10 * MINUTE);
  }

  init(forced = false): void {
    const currentDate = (new Date()).getTime();
    if (!forced) {
      if (this.nextUpdate > currentDate) {
        return;
      }
    }
    this.fetch();
  }

  protected fetch(): void {
    this.api.select<Ledger[]>(this.tableName).subscribe(
      ledgers => {
        this.store(ledgers);
      },
      error => {
        this.data.next([]);
        this.notification.showError('Error', 'An Error Occurred While Fetching Data');
        console.log(error);
      }
    );
  }

  create(ledger: Ledger): Observable<Ledger> {
    return this.api.create<Ledger>(this.tableName, ledger)
    .pipe(tap(insertedLedger => {
      this.insert(insertedLedger);
    }));
  }

  update(ledger: Ledger): Observable<Ledger> {
    return this.api.update<Ledger>(this.tableName, ledger)
    .pipe(tap(updatedLedger => {
      this.updateItem(updatedLedger);
    }));
  }

  delete(index: number): Observable<string> {
    try{
      const item = this.get(index);
      return this.api.delete<string>(this.tableName, item.id)
      .pipe(tap(() => {
        this.deleteItem(index);
      }));
    } catch (e) {
      this.notification.showError('Can\'t Delete', 'Item Does Not Exist');
      throw new Error('Item Not Found Error');
    }
  }
}
