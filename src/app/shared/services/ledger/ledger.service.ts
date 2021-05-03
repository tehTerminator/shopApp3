import { Injectable } from '@angular/core';
import { BaseService } from '../../class/BaseService';
import { Ledger, MINUTE } from '../../collection';
import { ApiService } from './../api/api.service';
import { NotificationService } from './../notification/notification.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService {

  constructor(private api: ApiService, private notification: NotificationService) {
    super('ledgers', 10 * MINUTE);
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
      .pipe(
        tap(insertedLedger => {
          this.insert(insertedLedger);
        }),
        catchError(error => {
          console.log(error);
          throw new Error('Unable to Create New Ledger');
        })
      );
  }

  update(ledger: Ledger): Observable<Ledger> {
    return this.api.update<Ledger>(this.tableName, ledger)
      .pipe(tap(updatedLedger => {
        this.updateItem(updatedLedger);
      }));
  }

  delete(index: number): Observable<string> {
    try {
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

  public isInstanceOfLedger(data: any): data is Ledger {
    return 'kind' in data;
  }
}
