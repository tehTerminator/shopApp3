import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../../../shared/class/BaseService';
import { Customer } from '../../../shared/collection';
import { ApiService } from '../../../shared/services/api/api.service';

@Injectable()
export class CustomerService extends BaseService {

    constructor(private api: ApiService) {
        super('customers', 60);
    }

    protected fetch(): void {
        this.api.select<Customer[]>(this.tableName)
        .subscribe(customers => this.store(customers));
    }

    public create(customer: Customer): Observable<Customer> {
        return this.api.create<Customer>(this.tableName, customer)
        .pipe(
            tap(response => {
                this.insert(response);
            }),
            catchError(error => {
                console.log(error);
                throw new Error('Unable to Create New Customer');
            })
        );
    }

    public update(customer: Customer): Observable<Customer> {
        throw new Error('Method not implemented.');
    }
    public delete(id: number): Observable<any> {
        throw new Error('Method not implemented.');
    }

}