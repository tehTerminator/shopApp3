export const MenuItems = [
    {
        chartType: 'bar',
        url: 'userWiseInvoiceCount',
        title: 'User Wise Invoice Count',
        queryParams: {
            xaxislabel: 'Operators',
            yaxislabel: 'Invoice Count'
        }
    },
    {
        chartType: 'bar',
        url: 'userWisePaymentCount',
        title: 'User Wise Payment Count',
        queryParams: {
            xaxislabel: 'Operator',
            yaxislabel: 'Invoice Amount'
        }
    },
    {
        chartType: 'bar',
        url: 'userWiseSalesCount',
        title: 'User Wise Sales Count',
        queryParams: {
            xaxislabel: 'Operator',
            yaxislabel: 'Sale'
        }
    },
    {
        chartType: 'bar',
        url: 'productWiseSaleCount',
        title: 'Product Wise Sales',
        queryParams: {
            xaxislabel: 'Product Name',
            yaxislabel: 'Amount'
        }
    },
    {
        chartType: 'bar',
        url: 'monthlyStats',
        title: 'Invoice Amount',
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
    {
        chartType: 'line',
        url: 'operatorPerformance',
        title: 'Operator Performance',
        queryParams: {
            xasislabel: 'Date',
            yaxislabel: 'Amount'
        }
    }
];
