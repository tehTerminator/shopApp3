import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ChartData } from '../../../../shared/collection';
import { retry, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-bar-chart',
    template: `
        <div class="card">
            <div class="card-header">{{ header }} </div>
            <div class="card-body text-center">
                <ngx-charts-line-chart
                    [legend]="TRUE"
                    [legendPosition]="legendPosition"
                    [xAxis]="TRUE"
                    [yAxis]="TRUE"
                    [showXAxisLabel]="TRUE"
                    [showYAxisLabel]="TRUE"
                    [xAxisLabel]="xAxisLabel"
                    [yAxisLabel]="yAxisLabel"
                    [results]="dataSet"
                    *ngIf="!empty; else noData"
                ></ngx-charts-line-chart>
            </div>
        </div>
        <ng-template #noData>
            <h1 class="fs-3">Sorry No Data to Display</h1>
        </ng-template>
    `,
    styles: ['']
})
export class LineChartComponent implements OnInit, OnDestroy {
    dataUrl = '';
    header = '';
    xAxisLabel = '';
    yAxisLabel = '';
    dataSet: LineChartData[] = [];
    private $notify = new Subject();
    readonly legendPosition = 'right';
    readonly TRUE = true;
    readonly colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5', '#FF01FF', '#FF0010', '#0100FF', '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']
    };

    constructor(private api: ApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.$notify))
            .subscribe((value => {
                this.dataUrl = value.url;
                this.fetchData();
            }));

        this.route.queryParamMap.pipe(takeUntil(this.$notify))
            .subscribe((value => {
                this.header = value.get('header') || 'Default Header';
                this.xAxisLabel = value.get('xaxislabel') || '';
                this.yAxisLabel = value.get('yaxislabel') || '';
            }));
    }

    ngOnDestroy(): void {
        this.$notify.next();
        this.$notify.complete();
    }

    private fetchData(): void {
        this.api.select<LineChartData[]>(this.dataUrl)
            .pipe(retry(5))
            .subscribe(
                (response => this.dataSet = response),
                () => this.dataSet = []
            );
    }

    get empty(): boolean {
        return this.dataSet.length === 0;
    }
}

interface LineChartData {
    name: string;
    series: ChartData[];
}
