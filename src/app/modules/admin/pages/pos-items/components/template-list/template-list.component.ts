import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PosItemService } from './../../../../../../shared/services/posItem/pos-item.service';
import { ProductService } from './../../../../../../shared/services/product/product.service';
import { LedgerService } from './../../../../../../shared/services/ledger/ledger.service';
import { Ledger, PosItem, PosItemTemplate, Product } from '../../../../../../shared/collection';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit, OnChanges {
  @Input() pos = 0;

  constructor(
    private productService: ProductService,
    private ledgerService: LedgerService,
    private posItemService: PosItemService
  ) { }

  ngOnInit(): void {
    this.productService.init();
    this.ledgerService.init();
    this.posItemService.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.pos;

    if (change.currentValue !== change.previousValue) {
      this.pos = change.currentValue;
    }
  }

  deleteItem(template: PosItemTemplate): void {
    this.posItemService.deleteTemplate(template)
    .subscribe(
      () => {
        console.log('Item Deleted Success');
      },
      error => {
        console.log(error);
      }
    );
  }

  getTemplatesAsObservable(): Observable<PosItemTemplate[]> {
    return this.posItemService.getTemplatesAsObservable(this.pos);
  }

  get posItems(): Observable<PosItem[]> {
    return this.posItemService.getAsObservable() as Observable<PosItem[]>;
  }

  get totalAmount(): Observable<number> {
    return this.getTemplatesAsObservable().pipe(
      map(
        items => {
          let total = 0;
          items.forEach(item => {
            total += this.calcAmount(item);
          });
          return total;
        }
      )
    );
  }

  getTitle(template: PosItemTemplate): string {
    if (template.kind === 'PRODUCT') {
      return this.getProductName(template.item_id);
    }
    return this.getledgerName(template.item_id);
  }

  private getProductName(id: number): string {
    let productName = '';
    try {
      productName = (this.productService.getElementById(id) as Product).title;
    } catch (e) {
      productName = 'NOT FOUND';
    }
    return productName;
  }

  private getledgerName(id: number): string {
    let ledgerName = '';
    try {
      ledgerName = (this.ledgerService.getElementById(id) as Ledger).title;
    } catch (e) {
      ledgerName = 'NOT FOUND';
    }
    return ledgerName;
  }

  private calcAmount(template: PosItemTemplate): number {
    return (template.quantity * template.rate);
  }

}
