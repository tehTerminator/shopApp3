import { TableRow, Customer } from "../collection";


export interface Invoice extends TableRow {
    kind: string;
    customer: Customer;
    contact_id: number;
    user_id: number;
    paid: boolean;
    amount: number;
    transactions: Transaction[];
}

export interface Transaction extends TableRow {
    invoice_id: number;
    item_id: number;
    kind: string;
    description: string;
    quantity: number;
    rate: number;
    discount: number;
    user_id: number;
}

export interface StockTransaction extends Transaction {
    stock_item_id: number;
}

export interface PaymentInfo extends TableRow {
    invoice_id: number;
    contact_id: number;
    voucher_id: number;
    amount: number;
}
