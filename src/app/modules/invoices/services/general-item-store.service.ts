import { Injectable } from '@angular/core';
import { Product, GeneralItem, ItemType } from '../../../shared/collection';
import { Bundle } from "../../../shared/interface/Bundle";
import { Ledger } from '../../../shared/interface/Ledger';
import { LedgerService } from '../../../shared/services/ledger/ledger.service';
import { BundleService } from '../../../shared/services/bundle/bundle.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { ApiService } from '../../../shared/services/api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class GeneralItemStoreService {

    private data:GeneralItem[] = [];

    constructor(
        private ledgerService: LedgerService,
        private productService: ProductService,
        private bundleService: BundleService,
        private apiService: ApiService
    ) { }

    init(): void {
        this.ledgerService.init();
        this.productService.init();
        this.bundleService.init();

        this.apiService.get<GeneralItem[]>(['general-item'])
        .subscribe(
            res => {this.data = res;},
            err => {
                console.log(err);
                this.data = [];
            }
        );
    }

    get items(): GeneralItem[] {
        return this.data;
    }

    // get products(): GeneralItem[] {
    //     const list = this.productService.getAsList() as Product[];
    //     return this.mapListToGeneralItemList(list);
    // }

    // get ledgers(): GeneralItem[] {
    //     let list = this.ledgerService.getAsList() as Ledger[];
    //     list = list.filter(x => x.kind === 'BANK' || x.kind === 'CASH');
    //     return this.mapListToGeneralItemList(list);
    // }

    // get bundles(): GeneralItem[] {
    //     const list = this.bundleService.getAsList() as Bundle[];
    //     return this.mapListToGeneralItemList(list);
    // }

    // get items(): GeneralItem[] {
    //     return [...this.products, ...this.bundles, ...this.ledgers];
    // }

    // private mapListToGeneralItemList(list: Ledger[] | Product[] | Bundle[] ): GeneralItem[] {
    //     if (list.length === 0) {
    //         return [];
    //     }
    //     const newList: GeneralItem[] = [];
    //     list.forEach((item: Product | Ledger | Bundle ) => {
    //         let type = ItemType.PRODUCT;
    //         let rate = 0;
              
    //         if (this.ledgerService.isInstanceOfLedger(item)) {
    //             type = ItemType.LEDGER;
    //         } else if (this.bundleService.isInstanceOfBundle(item)) {
    //             type = ItemType.BUNDLE;
    //             rate = item.rate;
    //         } else {
    //             rate = item.rate;
    //         }
    //         newList.push({
    //             id: item.id,
    //             title: item.title,
    //             type, rate
    //         });
    //     });
    //     return newList;
    // }

    selectActualItem(item: GeneralItem): Product | Ledger | Bundle {
        switch (item.type) {
            case ItemType.PRODUCT:
                return this.productService.getElementById(item.id) as Product;
            case ItemType.LEDGER:
                return this.ledgerService.getElementById(item.id) as Ledger;
            default:
                return this.bundleService.getElementById(item.id) as Bundle;
        }
    }

}
