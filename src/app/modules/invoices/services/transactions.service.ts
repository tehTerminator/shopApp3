import { Injectable } from "@angular/core";
import { GeneralItem } from "../../../shared/collection";
import { DetailedTransaction, GeneralTransaction, StockTransaction } from "../../../shared/interface/Invoice";
import { GeneralItemStoreService } from "./general-item-store.service";

@Injectable()
export class TransactionStoreService {
    detailed: DetailedTransaction[] = [];
    general: GeneralTransaction[] = [];
    stockT: StockTransaction[] = [];

    public addTransaction(item: GeneralItem) {

    }

    private extractDetails

    public constructor(
        private gsStore: GeneralItemStoreService
    ) {}
}