import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from './../../../../shared/services/api/api.service';
import { ChartData } from './../../../../shared/collection';

@Component({
    selector: 'app-pie-chart',
    template: `
        <div class="card">
            <div class="card-header">{{ header }} </div>
            <div class="card-body">
                <ngx-charts-pie-chart
                [legend]="TRUE"
                [legendPosition]="legendPosition"
                [results]="dataSet"
                *ngIf="!empty; else noData"
                ></ngx-charts-pie-chart>
            </div>
        </div>
        <ng-template #noData>
            <h1 class="fs-3">Sorry No Data to Display</h1>
        </ng-template>
    `,
    styles: ['']
})
export class PieChartComponent implements OnChanges {
    @Input() dataUrl = '';
    @Input() header = '';
    readonly legendPosition = 'below';
    dataSet: ChartData[] = [];
    readonly TRUE = true;

    constructor(private api: ApiService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const urlChange = changes.dataUrl;

        if (urlChange.isFirstChange()) {
            this.fetchData();
        }
    }

    private fetchData(): void {
        this.api.select<ChartData[]>(this.dataUrl)
        .subscribe(
            response => this.dataSet = response,
            error => this.dataSet = []
        );
    }

    get empty(): boolean {
        return this.dataSet.length === 0;
    }

}