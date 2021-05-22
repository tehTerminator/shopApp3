import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styles: ['']
})
export class SideMenuComponent implements OnInit {
    menuItems: Menu[] = [];

    ngOnInit(): void {
        this.menuItems = [
            {
                chartType: 'pie',
                url: 'userWiseInvoiceCount',
                title: 'User Wise Invoice Count',
            },
            {
                chartType: 'pie',
                url: 'userWisePaymentCount',
                title: 'User Wise Payment Count'
            },
            {
                chartType: 'pie',
                url: 'userWiseSalesCount',
                title: 'User Wise Sales Count'
            },
            {
                chartType: 'pie',
                url: 'productWiseSaleCount',
                title: 'Product Wise Sales'
            },
            {
                chartType: 'bar',
                url: 'monthlyStats',
                title: 'Montly Invoice Amount',
                queryParams: {
                    xaxislabel: 'Date Invoices were Created',
                    yaxislabel: 'Total Amount of Invoices'
                }
            },
            {
                chartType: 'line',
                url: 'incomeExpense',
                title: 'Income Vs Expense',
                queryParams: {
                    xaxislabel: 'Date',
                    yaxislabel: 'Amount'
                }
            },

        ];
    }

    getQueryParams(index: number): {[key: string]: string} {
        const menu = this.menuItems[index];
        if (menu.queryParams) {
            return { header: menu.title, ...menu.queryParams };
        }
        return { header: menu.title };
    }
}


interface Menu {
    title: string;
    chartType: string;
    url: string;
    queryParams?: {
        [key: string]: any
    };
}
