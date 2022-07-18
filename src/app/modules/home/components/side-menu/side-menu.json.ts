export const MenuItems = [
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
