import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Ledger, PosItem, GeneralItem, ItemType, HOUR } from '../../../shared/collection';
import { ApiService } from '../../../shared/services/api/api.service';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { PosItemService } from '../../../shared/services/posItem/pos-item.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { GeneralItemService } from '../../../shared/services/general-items/general-items.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralItemStoreService {

    constructor(
        private ledgerService: LedgerService,
        private productService: ProductService,
        private posItemService: PosItemService,
        private generalItemService: GeneralItemService,
    ) { }

    init(): void {
        this.ledgerService.init();
        this.productService.init();
        this.posItemService.init();
        this.generalItemService.init();
    }
    

    get items(): GeneralItem[] {
        return this.generalItemService.getAsList() as GeneralItem[];
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
