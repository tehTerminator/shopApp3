import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LedgerService } from './../../../../shared/services/ledger/ledger.service';
import { ProductService } from './../../../../shared/services/product/product.service';
import { PosItemService } from './../../../../shared/services/posItem/pos-item.service';
import { merge, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ledger, PosItem, Product } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';

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
    private store: InvoiceStoreService
  ) { }

  ngOnInit(): void {
    this.ledgerService.init();
    this.productService.init();
    this.posItemService.init();
  }

  get items(): Observable<Ledger[] | Product[] | PosItem[]> {
    return merge(
      this.ledgerService.getAsObservable() as Observable<Ledger[]>,
      this.productService.getAsObservable() as Observable<Product[]>,
      this.posItemService.getAsObservable() as Observable<PosItem[]>
    );
  }

  selectItem(item: Ledger | Product | PosItem): void {
    this.store.selectedItem = item;
    this.router.navigate(['/invoices', 'transactions']);
  }
}
