import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { BaseService } from '../../class/BaseService';
import { HOUR, Bundle, PosItemTemplate } from '../../collection';
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
        this.api.select<Bundle[]>(this.tableName).subscribe(
            posItems => this.store(posItems),
            error => {
                this.data.next([]);
                this.notificationService.showError('Error', 'An Error Occurred While Fetching Data');
                console.log(error);
            }
        );
    }

    getTemplatesAsObservable(posItemId: number): Observable<PosItemTemplate[]> {
        return this.data.pipe(
            map(
                x => {
                    const item = (x.find(d => d.id === posItemId) as Bundle);
                    if (item === undefined) {
                        return [];
                    }
                    return item.pos_templates;
                }
            ),
            catchError(error => {
                console.log(error);
                return [];
            })
        );
    }

    create(posItem: Bundle): Observable<Bundle> {
        return this.api.create<Bundle>(this.tableName, posItem)
            .pipe(
                tap(
                    response => this.insert(response)
                ),
                catchError(
                    e => {
                        console.log(e);
                        throw new Error('Unable to Insert New Item to List');
                    }
                )
            );
    }

    update(posItem: Bundle): Observable<Bundle> {
        return this.api.update<Bundle>(this.tableName, posItem)
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
                        try {
                            const posItem = this.getElementById(response.positem_id) as Bundle;
                            if (posItem.hasOwnProperty('pos_templates')) {
                                posItem.pos_templates.push(response);
                            } else {
                                posItem.pos_templates = [response];
                            }
                            this.updateItem(posItem);
                        } catch (e) {
                            console.log(e);
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
                        try {
                            const posItem = this.getElementById(response.positem_id) as Bundle;
                            const indexOfTemplateToBeReplaced = this.findTemplateIndexById(response.positem_id, response.id);
                            posItem.pos_templates.splice(indexOfTemplateToBeReplaced, 1, response);
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
                        try {
                            const posItem = this.getElementById(template.positem_id) as Bundle;
                            const indexOfItemToBeDeleted = this.findTemplateIndexById(posItem.id, template.id);
                            posItem.pos_templates.splice(indexOfItemToBeDeleted, 1);
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

    public isInstanceOfPosItem(data: any): data is Bundle {
        return 'pos_templates' in data;
    }

    private findTemplateIndexById(posItemId: number, templateId: number): number {
        try {
            const item = this.getElementById(posItemId) as Bundle;
            return item.pos_templates.findIndex(
                x => x.id === templateId
            );
        } catch (error) {
            throw new Error('Pos Item Not Found');
        }
    }
}
