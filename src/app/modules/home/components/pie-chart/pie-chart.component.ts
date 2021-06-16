import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './../../../../shared/services/api/api.service';
import { ChartData } from './../../../../shared/collection';
import { retry, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { getCurrentDateString } from './../../../../shared/functions';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styles: ['']
})
export class PieChartComponent implements OnInit, OnDestroy {
    dateField = new FormControl(getCurrentDateString());
    dataUrl: string | null = 'userWiseInvoice';
    header = 'Default Header';
    dataSet: ChartData[] = [];
    hasData = false;
    readonly legendPosition = 'right';
    readonly TRUE = true;
    readonly view: [number, number] = [800, 300];
    readonly colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5', '#FF00FF', '#FF0000', '#0000FF', '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600']
    };

    private $notify = new Subject();

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.$notify))
            .subscribe((value => {
                this.dataUrl = value.url;
                this.fetchData();
            }));

        this.route.queryParamMap.pipe(takeUntil(this.$notify))
            .subscribe((value => {
                this.header = value.get('header') || 'Default Header';
            }));
    }

    ngOnDestroy(): void {
        this.$notify.next();
        this.$notify.complete();
    }

    fetchData(): void {
        if (this.dataUrl === null) {
            return;
        }
        this.api.select<ChartData[]>(this.dataUrl, {date: this.dateField.value})
            .pipe(retry(5))
            .subscribe(
                response => {
                    console.log(response);
                    this.dataSet = response;
                },
                () => this.dataSet = []
            );
    }

    get empty(): boolean {
        return this.dataSet.length === 0;
    }

    constructor(
        private api: ApiService,
        private route: ActivatedRoute
    ) { }
}
