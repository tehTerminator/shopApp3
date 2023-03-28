import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { BaseService } from '../../class/BaseService';
import { HOUR } from '../../collection';
import { Bundle, BundleTemplate } from "../../interface/Bundle";
import { ApiService, GeneralReponse } from '../api/api.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class BundleService extends BaseService {

    constructor(
        private api: ApiService,
        private notificationService: NotificationService) {
        super('bundle', HOUR);
    }

    protected fetch(): void {
        this.api.get<Bundle[]>(['bundles']).subscribe(
            bundles => this.store(bundles),
            error => {
                this.data.next([]);
                this.notificationService.showError('Error', 'An Error Occurred While Fetching Data');
                console.log(error);
            }
        );
    }

    getTemplatesAsObservable(bundleId: number): Observable<BundleTemplate[]> {
        return this.data.pipe(
            map(
                x => {
                    const item = (x.find(d => d.id === bundleId) as Bundle);
                    if (item === undefined) {
                        return [];
                    }
                    return item.templates;
                }
            ),
            catchError(error => {
                console.log(error);
                return [];
            })
        );
    }

    create(bundle: Bundle): Observable<Bundle> {
        return this.api.insert<Bundle>(['bundles'], bundle)
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

    update(bundle: Bundle): Observable<Bundle> {
        return this.api.revise<Bundle>(['bundles'], bundle)
            .pipe(
                tap(response => this.updateItem(response)),
                catchError(
                    error => {
                        console.log(error);
                        throw new Error('Unable to Update Bundle');
                    }
                )
            );
    }

    delete(index: number): Observable<GeneralReponse> {
        try {
            const item = this.get(index);
            return this.api.remove([this.tableName, item.id])
                .pipe(tap(() => this.deleteItem(index)));
        } catch (e) {
            throw new Error('Item Not Found');
        }
    }

    createTemplate(template: BundleTemplate): Observable<BundleTemplate> {
        return this.api.insert<BundleTemplate>(['bundle', 'template'], template)
            .pipe(
                tap(
                    response => {
                        try {
                            const bundle = this.getElementById(response.positem_id) as Bundle;
                            if (bundle.hasOwnProperty('templates')) {
                                bundle.templates.push(response);
                            } else {
                                bundle.templates = [response];
                            }
                            this.updateItem(bundle);
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

    deleteTemplate(template: BundleTemplate): Observable<any> {
        return this.api.remove(['bundle', 'template', template.id])
            .pipe(
                tap(
                    () => {
                        try {
                            const bundle = this.getElementById(template.positem_id) as Bundle;
                            const indexOfItemToBeDeleted = this.findTemplateIndexById(bundle.id, template.id);
                            bundle.templates.splice(indexOfItemToBeDeleted, 1);
                            this.updateItem(bundle);
                        } catch (e) {
                            throw new Error('Bundle Not Found');
                        }
                    }
                ),
                catchError(error => {
                    console.log(error);
                    throw new Error('Unable to Delete Template');
                })
            );
    }

    public isInstanceOfBundle(data: any): data is Bundle {
        return 'templates' in data;
    }

    private findTemplateIndexById(bundleId: number, templateId: number): number {
        try {
            const item = this.getElementById(bundleId) as Bundle;
            return item.templates.findIndex(
                x => x.id === templateId
            );
        } catch (error) {
            throw new Error('Pos Item Not Found');
        }
    }
}
