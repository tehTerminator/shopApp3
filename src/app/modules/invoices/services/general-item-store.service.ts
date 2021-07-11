import { Injectable } from '@angular/core';
import { Product, Ledger, PosItem, GeneralItem, ItemType } from '../../../shared/collection';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { PosItemService } from '../../../shared/services/posItem/pos-item.service';
import { ProductService } from '../../../shared/services/product/product.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralItemStoreService {
    constructor(
        private ledgerService: LedgerService,
        private productService: ProductService,
        private posItemService: PosItemService
    ) { }

    init(): void {
        this.ledgerService.init();
        this.productService.init();
        this.posItemService.init();
    }

    get products(): GeneralItem[] {
        const list = this.productService.getAsList() as Product[];
        return this.mapListToGeneralItemList(list);
    }

    get ledgers(): GeneralItem[] {
        let list = this.ledgerService.getAsList() as Ledger[];
        list = list.filter(x => x.kind === 'BANK' || x.kind === 'CASH');
        return this.mapListToGeneralItemList(list);
    }

    get posItems(): GeneralItem[] {
        const list = this.posItemService.getAsList() as PosItem[];
        return this.mapListToGeneralItemList(list);
    }

    get items(): GeneralItem[] {
        return [...this.products, ...this.posItems, ...this.ledgers];
    }

    private mapListToGeneralItemList(list: Ledger[] | Product[] | PosItem[]): GeneralItem[] {
        if (list.length === 0) {
            return [];
        }
        const newList: GeneralItem[] = [];
        list.forEach((item: Product | Ledger | PosItem) => {
            let type = ItemType.PRODUCT;
            let rate = 0;
            if (this.ledgerService.isInstanceOfLedger(item)) {
                type = ItemType.LEDGER;
            } else if (this.posItemService.isInstanceOfPosItem(item)) {
                type = ItemType.POSITEM;
                rate = item.rate;
            } else {
                rate = item.rate;
            }
            newList.push({
                id: item.id,
                title: item.title,
                type, rate
            });
        });
        return newList;
    }

    selectActualItem(item: GeneralItem): Product | Ledger | PosItem {
        switch (item.type) {
            case ItemType.PRODUCT:
                return this.productService.getElementById(item.id) as Product;
            case ItemType.LEDGER:
                return this.ledgerService.getElementById(item.id) as Ledger;
            default:
                return this.posItemService.getElementById(item.id) as PosItem;
        }
    }

}