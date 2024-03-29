import { Injectable } from '@angular/core';
import { BaseService } from '../../class/BaseService';
import { MINUTE } from '../../collection';
import { Ledger } from '../../interface/Ledger';
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

  updateBalance(id: number, opening?: number, closing?: number): Observable<any> {
    return this.api.create<Ledger>('balance', {id, opening, closing})
    .pipe(
      tap(ledger => {
        this.updateItem(ledger);
      }),
      catchError(
        error => {
          console.error(error);
          throw new Error('Unable to Update Balance');
        }
      )
    );
  }

  public getElementByTitle(title: string): Ledger {
    const list = this.data.value as Ledger[];
    title = title.toLowerCase();
    if (list.length > 0) {
      const result = list.find(x => x.title.toLowerCase() === title);
      if (!!result) {
        return result;
      }
      throw new Error('Item Not Found');
    }
    throw new Error('List is Empty');
  }

  public isInstanceOfLedger(data: any): data is Ledger {
    return 'kind' in data;
  }
}
