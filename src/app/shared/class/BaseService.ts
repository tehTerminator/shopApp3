import { BehaviorSubject, Observable } from 'rxjs';
import { TableRow } from '../collection';

export abstract class BaseService {
    protected data = new BehaviorSubject<TableRow[]>([]);
    protected nextUpdate = 0;
    private initialized = false;

    protected abstract fetch(): void;
    public abstract create(data: TableRow): Observable<TableRow>;
    public abstract update(data: TableRow): Observable<TableRow>;
    public abstract delete(id: number): Observable<any>;

    constructor(
        private ptableName: string,
        protected updateFrequency: number) { }

    get tableName(): string { 
        return this.ptableName;
    }

    public init(forced = false): void {
        const currentDate = (new Date()).getTime();
        if (!forced) {
          if (this.nextUpdate > currentDate) {
            return;
          }
        }

        if (this.initialized) {
            return; // Prevents Multiple Init Calls
        }

        this.initialized = true;
        this.fetch();
    }

    protected store(data: TableRow[]): void {
        this.data.next(data);
        this.nextUpdate = (new Date()).getTime() + this.updateFrequency;
    }

    getElementById(id: number): TableRow {
        const list = this.data.value;
        if (list.length === 0) {
            throw new Error('Item Not Found');
        }
        
        const result = list.find(x => {
            if (x.hasOwnProperty('id')) {
                return x.id === id;
            }
            throw new Error('ID field Not Found in List');
        });

        if (!!result) {
            return result;
        }
    }

    get(index: number): TableRow {
        return { ...this.data.value[index] };
    }

    getAsList(): TableRow[] {
        return [...this.data.value];
    }

    getAsObservable(): Observable<TableRow[]> {
        return this.data;
    }

    protected deleteItem(index: number): void {
        this.data.next(this.data.value.splice(index, 1));
        this.updateTimeStamp();
    }

    protected insert(item: TableRow): void {
        this.data.next([...this.data.value, item]);
        this.updateTimeStamp();
    }

    protected updateItem(item: TableRow): void {
        if (!item.hasOwnProperty('id')) {
            throw new Error(`Unique Field Does Not Exist in Provided Item`);
        }
        const list = this.data.value;
        const indexOfItemToBeReplaced = list.findIndex(x => {
            if (x.hasOwnProperty('id')) {
                return x.id === item.id;
            }
            throw new Error('No Unique Field in List');
        });
        list.splice(indexOfItemToBeReplaced, 1, item);
        this.data.next(list);
        this.updateTimeStamp();
    }

    private updateTimeStamp(): void {
        this.nextUpdate = (new Date()).getTime() + this.updateFrequency;
    }
}
