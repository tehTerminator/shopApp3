import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { ChartData } from '../../../../shared/collection';
import { retry, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styles: ['']
})
export class BarChartComponent implements OnInit, OnDestroy {
    dataUrl = '';
    header = '';
    xAxisLabel = '';
    yAxisLabel = '';
    dataSet: ChartData[] = [];
    private $notify = new Subject();
    readonly legendPosition = 'right';
    readonly TRUE = true;
    readonly colorScheme = 'vivid';

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
        this.api.select<ChartData[]>(this.dataUrl)
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
