import { Injectable } from '@angular/core';
import { HOUR, Product } from '../../collection';
import { BaseService } from './../../class/BaseService';
import { ApiService } from './../api/api.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(private api: ApiService, private notificationService: NotificationService) {
    super('products', HOUR);
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
    this.api.select<Product[]>(this.tableName).subscribe(
      products => this.store(products),
      error => {
        this.data.next([]);
        this.notificationService.showError('Error', 'An Error Occurred While Fetching Data');
        console.log(error);
      }
    );
  }

  create(product: Product): Observable<Product> {
    return this.api.create<Product>(this.tableName, product)
    .pipe(tap(response => {
      this.insert(response);
    }));
  }

  update(product: Product): Observable<Product> {
    return this.api.update<Product>(this.tableName, product)
    .pipe(
      tap(
        response => this.updateItem(response)
      ),
      catchError(
        error => {
          console.log(error);
          throw new Error('Unable to Update Product');
        }
      )
    );
  }

  delete(index: number): Observable<any> {
    try{
      const item = this.get(index);
      return this.api.delete<any>(this.tableName, item.id)
      .pipe(
        tap(() => this.deleteItem(index))
      );
    } catch (e) {
      throw new Error('Item Not Found');
    }
  }
}
