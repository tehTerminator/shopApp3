import { TableRow } from "../collection";


export interface Bundle extends TableRow {
    title: string;
    rate: number;
    templates: BundleTemplate[];
}

export interface BundleTemplate extends TableRow {
    positem_id: number;
    item_id: number;
    kind: string;
    rate: number;
    quantity: number;
}