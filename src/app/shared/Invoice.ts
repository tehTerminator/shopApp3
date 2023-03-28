import { TableRow, Customer } from "./collection";


export interface Invoice extends TableRow {
    customer: Customer;
    contact_id: number;
    user_id: number;
    paid: boolean;
    amount: number;
    generalTransactions: GeneralTransaction[];
    detailedTransactions: DetailedTransaction[];
    stockTransactions: StockTransaction[];
}

export interface Transaction extends TableRow {
    invoice_id: number;
    quantity: number;
}

export interface GeneralTransaction extends Transaction {
    description: string;
    rate: number;
    discount: number;
}

export interface DetailedTransaction extends Transaction {
    item_id: number;
    kind: string;
    description: string;
    rate: number;
    discount: number;
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
