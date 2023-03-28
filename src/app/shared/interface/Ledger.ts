import { TableRow } from "./../collection";


export interface Ledger extends TableRow {
    title: string;
    kind: string;
    can_receive_payment: boolean;
}
