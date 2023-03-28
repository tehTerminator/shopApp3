import { Ledger } from "./interface/Ledger";

export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

export const STRING = '^[0-9a-zA-Z ]+$';
export const ALPHA_NUM = '^[0-9a-zA-Z]+$';
export const ALPHA = '^[a-zA-Z]+$';

export interface TableRow {
    id: number;
    created_at: string;
    updated_at: string;
}

export enum AppDialog {
    CALCULATOR,
    NOTIFICATION,
    VOUCHERFORM
}

export enum AuthState {
    LOGGED_OUT,
    STARTED,
    LOGGED_IN,
}

export interface Balance extends TableRow {
    ledger_id: number;
    opening: number;
    closing: number;
}

export interface UserData extends TableRow {
    displayName: string;
    username: string;
    token: string;
}

export interface Product extends TableRow {
    title: string;
    rate: number;
}

export interface Voucher extends TableRow {
    cr: number;
    dr: number;
    narration: string;
    amount: number;
    user_id: number;
    state: boolean;
    creditor: Ledger;
    debtor: Ledger;
}

export interface Customer extends TableRow {
    title: string;
    address: string;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface GeneralItem {
    id: number;
    title: string;
    type: ItemType;
    rate: number;
}

export enum ItemType {
    PRODUCT,
    LEDGER,
    BUNDLE,
}
