import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ProductService } from './../../../../shared/services/product/product.service';
import { PosItemService } from './../../../../shared/services/posItem/pos-item.service';
import { asyncScheduler, concat, EMPTY, from, merge, Observable, scheduled, } from 'rxjs';
import { concatAll, concatMap, map, mergeAll, mergeMap, take } from 'rxjs/operators';
import { Ledger, PosItem, Product } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  constructor(
    private router: Router,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private posItemService: PosItemService,
    private store: InvoiceStoreService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.ledgerService.init();
    this.productService.init();
    this.posItemService.init();
  }

  get products(): GeneralItem[] {
    const list = this.productService.getAsList() as Product[];
    return this.mapListToGeneralItemList(list);
  }

  get ledgers(): GeneralItem[] {
    const list = this.ledgerService.getAsList() as Product[];
    return this.mapListToGeneralItemList(list);
  }

  get posItems(): GeneralItem[] {
    const list = this.posItemService.getAsList() as Product[];
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
      if (this.ledgerService.isInstanceOfLedger(item)) {
        type = ItemType.LEDGER;
      } else if (this.posItemService.isInstanceOfPosItem(item)) {
        type = ItemType.POSITEM;
      }
      newList.push({
        id: item.id,
        title: item.title,
        type,
      });
    });
    return newList;
  }

  onSelect(item: GeneralItem): void {
    try {
      this.store.selectedItem = this.selectActualItem(item);
      this.router.navigate(['/invoices', 'transactions']);
    } catch (e) {
      console.log('Cant Find in Any Service', item);
      this.notification.showError('Error', e);
    }
  }

  private selectActualItem(item: GeneralItem): Product | Ledger | PosItem {
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

interface GeneralItem {
  id: number;
  title: string;
  type: ItemType;
}

enum ItemType {
  PRODUCT,
  LEDGER,
  POSITEM
}
