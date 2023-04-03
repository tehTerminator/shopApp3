import { Injectable } from "@angular/core";
import { BaseService } from "../../class/BaseService";
import { GeneralItem, HOUR, TableRow } from "../../collection";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GeneralItemService extends BaseService {

    protected fetch(): void {
        this.api.select<GeneralItem[]>('generalItems')
        .subscribe(
            (items) => {
                this.store(items);
            },
            (err) => {
                console.error(err);
                this.store([])
            }
        )
    }

    create(data: TableRow): Observable<TableRow> {
        throw new Error('Not Implemented Yet');
    }

    update(data: TableRow): Observable<TableRow> {
        throw new Error('Not Implemented Yet');
    }

    delete(index: Number): Observable<TableRow> {
        throw new Error('Not Implemented Yet');
    }


    constructor(private api: ApiService){
        super('generalItems', HOUR);
    }
}