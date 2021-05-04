import { Ledger, Voucher } from "../collection";

export class Cashbook {
    private pLedger: Ledger;
    private pRows: CashbookRow[] = [];

    constructor(ledger: Ledger, vouchers: Voucher[]) {
        this.pLedger = ledger;
        this.pRows = [];
        vouchers.forEach(item => this.generateRow(item));
    }

    private generateRow(voucher: Voucher): void {
        const row: CashbookRow = {
            id: voucher.id,
            cr: voucher.creditor.title,
            dr: voucher.debtor.title,
            narration: voucher.narration,
            amount: 0,
            balance: 0
        };

        let prevBalance = 0;
        if (this.pRows.length === 0) {
            this.generateInitialRow();
        }
        prevBalance = this.pRows[this.pRows.length - 1].amount;
        if (this.pLedger.id === voucher.creditor.id) {
            row.balance = prevBalance - voucher.amount;
            row.amount = (-voucher.amount);
        } else {
            row.balance = prevBalance + voucher.amount;
            row.amount = voucher.amount;
        }
        this.pRows.push(row);
    }

    private generateInitialRow(): void {
        const row: CashbookRow = {
            id: 0,
            cr: 'Previous Day',
            dr: this.pLedger.title,
            narration: 'Opening Balance',
            amount: 0,
            balance: 0
        };
        row.balance = this.openingBalance;
        row.amount = this.openingBalance;
        this.pRows.push(row);
    }

    get openingBalance(): number {
        if (this.pLedger.balance.length === 1) {
            return this.pLedger.balance[0].opening;
        }
        return 0;
    }

    get closingBalance(): number {
        if (this.pLedger.balance.length === 1) {
            return this.pLedger.balance[0].closing;
        }
        return 0;
    }

    get rows(): CashbookRow[] {
        return this.pRows;
    }
}

export interface CashbookRow {
    id: number;
    cr: string;
    dr: string;
    narration: string;
    amount: number;
    balance: number;
}
