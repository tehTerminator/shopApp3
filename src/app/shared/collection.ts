export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

export const ALPHA_NUM = '^[0-9a-zA-Z]+$';

export interface TableRow{
    id: number;
    created_at: string;
    updated_at: string;
}

export enum AppDialog {
    CALCULATOR,
    NOTIFICATION
}

export enum AuthState {
    LOGGED_OUT,
    STARTED,
    LOGGED_IN,
}


export interface Ledger extends TableRow {
    title: string;
    group: string;
}

export interface UserData extends TableRow {
    name: string;
    username: string;
    token: string;
}


