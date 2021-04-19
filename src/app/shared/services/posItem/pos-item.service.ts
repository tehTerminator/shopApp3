import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BaseService } from '../../class/BaseService';
import { HOUR, PosItem, PosItemTemplate } from '../../collection';
import { ApiService } from '../api/api.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class PosItemService extends BaseService {

    constructor(
        private api: ApiService,
        private notificationService: NotificationService) {
        super('pos-items', HOUR);
    }

    protected fetch(): void {
        this.api.select<PosItem[]>(this.tableName).subscribe(
            posItems => this.store(posItems),
            error => {
                this.data.next([]);
                this.notificationService.showError('Error', 'An Error Occurred While Fetching Data');
                console.log(error);
            }
        );
    }

    create(posItem: PosItem): Observable<PosItem> {
        return this.api.create<PosItem>(this.tableName, posItem)
            .pipe(tap(response => {
                this.insert(response);
            }));
    }

    update(posItem: PosItem): Observable<PosItem> {
        return this.api.update<PosItem>(this.tableName, posItem)
            .pipe(
                tap(response => this.updateItem(response)),
                catchError(
                    error => {
                        console.log(error);
                        throw new Error('Unable to Update PosItem');
                    }
                )
            );
    }

    delete(index: number): Observable<any> {
        try {
            const item = this.get(index);
            return this.api.delete<any>(this.tableName, item.id)
                .pipe(tap(() => this.deleteItem(index)));
        } catch (e) {
            throw new Error('Item Not Found');
        }
    }

    createTemplate(template: PosItemTemplate): Observable<PosItemTemplate> {
        return this.api.create<PosItemTemplate>('template', template)
        .pipe(
            tap(
                response => {
                    try{
                        const posItem = this.getElementById(response.positem_id) as PosItem;
                        posItem.templates.push(response);
                        this.updateItem(posItem);
                    } catch (e) {
                        throw new Error('Pos Item Not Found');
                    }
                }
            ),
            catchError(error => {
                console.log(error);
                throw new Error('Unable to Create New Template');
            })
        );
    }

    updateTemplate(template: PosItemTemplate): Observable<PosItemTemplate> {
        return this.api.update<PosItemTemplate>('template', template)
        .pipe(
            tap(
                response => {
                    try{
                        const posItem = this.getElementById(response.positem_id) as PosItem;
                        const indexOfTemplateToBeReplaced = this.findTemplateIndexById(response.positem_id, response.id);
                        posItem.templates.splice(indexOfTemplateToBeReplaced, 1, response);
                        this.updateItem(posItem);
                    } catch (e) {
                        throw new Error('PosItem Not Found');
                    }
                }
            ),
            catchError(error => {
                console.log(error);
                throw new Error('Unable to Create New Template');
            })
        );
    }

    deleteTemplate(template: PosItemTemplate): Observable<any> {
        return this.api.delete('template', template.id)
        .pipe(
            tap(
                () => {
                    try{
                        const posItem = this.getElementById(template.positem_id) as PosItem;
                        const indexOfItemToBeDeleted = this.findTemplateIndexById(posItem.id, template.id);
                        posItem.templates.splice(indexOfItemToBeDeleted, 1);
                        this.updateItem(posItem);
                    } catch (e) {
                        throw new Error('PosItem Not Found');
                    }
                }
            ),
            catchError(error => {
                console.log(error);
                throw new Error('Unable to Delete Template');
            })
        );
    }

    private findTemplateIndexById(posItemId: number, templateId: number): number {
        try{
            const item = this.getElementById(posItemId) as PosItem;
            return item.templates.findIndex(
                x => x.id === templateId
            );
        } catch (error) {
            throw new Error('Pos Item Not Found');
        }
    }
}
