import { Ledger, Voucher } from '../collection';

export class Cashbook {
    private pLedger: Ledger;
    private pRows: CashbookRow[] = [];

    constructor(ledger: Ledger, vouchers: Voucher[], private openingBalance = 0) {
        this.pLedger = ledger;
        this.pRows = [];
        vouchers.forEach(item => this.generateRow(item));
    }

    private generateRow(voucher: Voucher): void {
        let transfer = voucher.creditor.title;
        if (voucher.cr === this.pLedger.id) {
            transfer = voucher.debtor.title;
        }
        const row: CashbookRow = {
            id: voucher.id,
            date: voucher.created_at,
            transfer,
            narration: voucher.narration,
            cr: 0,
            dr: 0,
            balance: 0
        };

        let prevBalance = 0;
        if (this.pRows.length === 0) {
            this.generateInitialRow(voucher.created_at);
        }
        prevBalance = this.pRows[this.pRows.length - 1].balance;
        if (this.pLedger.id === voucher.creditor.id) {
            row.balance = prevBalance - voucher.amount;
            row.cr = voucher.amount;
        } else {
            row.balance = prevBalance + voucher.amount;
            row.dr = voucher.amount;
        }
        this.pRows.push(row);
    }

    private generateInitialRow(initialDate: string): void {
        const row: CashbookRow = {
            id: 0,
            date: '',
            transfer: 'Previous Day',
            narration: 'Opening Balance',
            cr: 0,
            dr: 0,
            balance: 0
        };
        row.balance = this.openingBalance;
        row.dr = this.openingBalance;
        this.pRows.push(row);
    }

    get rows(): CashbookRow[] {
        return this.pRows;
    }
}

export interface CashbookRow {
    id: number;
    date: string;
    transfer: string;
    narration: string;
    cr: number;
    dr: number;
    balance: number;
}
