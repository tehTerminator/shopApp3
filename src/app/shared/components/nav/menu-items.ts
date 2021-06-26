export const MENUITEMS = [
    {
        title: 'Home',
        url: ['/home'],
        children: []
    },
    {
        title: 'Cashbook',
        url: ['/cashbook'],
        children: [
            {
                title: 'Create Voucher',
                url: ['/cashbook', 'voucher']
            },
            {
                title: 'View Statement',
                url: ['/cashbook', 'statement']
            },
            {
                title: 'Opening / Closing',
                url: ['/cashbook', 'balance']
            }
        ]
    },
    {
        title: 'Invoices',
        url: ['/invoices'],
        children: [
            {
                title: 'Create New',
                url: ['/invoices', 'create', 'select-customer']
            },
            {
                title: 'View Invoices',
                url: ['/invoices', 'search']
            },
        ]
    },
    {
        title: 'Administration',
        url: ['/admin'],
        children: [
            {
                title: 'Create / Edit Ledgers',
                url: ['/admin', 'ledger']
            },
            {
                title: 'Create / Edit Products',
                url: ['/admin', 'products']
            },
            {
                title: 'Create / Edit POS Items',
                url: ['/admin', 'pos-item']
            }
        ]
    }
]