import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../../class/BaseService';
import { HOUR, StockItem } from '../../collection';
import { ApiService } from '../api/api.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class StockItemService extends BaseService {

    protected fetch(): void {
        this.api.get<StockItem[]>([this.tableName])
            .subscribe(
                (stockItems) => this.store(stockItems),
                (err) => {
                    this.data.next([]);
                    this.ns.showError('Error', 'Unable to Fetch Items');
                    console.log(err);
                }
            );
    }

    create(stock: StockItem): Observable<StockItem> {
        return this.api.insert<StockItem>([this.tableName], stock)
            .pipe(tap(response => {
                this.insert(response);
            }));
    }

    update(stock: StockItem): Observable<StockItem> {
        return this.api.revise<StockItem>([this.tableName], stock)
            .pipe(
                tap(
                    response => this.updateItem(response)
                ),
                catchError(
                    error => {
                        console.log(error);
                        throw new Error('Unable to Update StockItem');
                    }
                )
            );
    }

    delete(index: number): Observable<any> {
        try {
            const item = this.get(index);
            return this.api.remove([this.tableName, `${item.id}`])
                .pipe(
                    tap(() => this.deleteItem(index))
                );
        } catch (e) {
            throw new Error('Item Not Found');
        }
    }

    constructor(
        private api: ApiService,
        private ns: NotificationService
    ) {
        super('stocks', HOUR);
    }
}
