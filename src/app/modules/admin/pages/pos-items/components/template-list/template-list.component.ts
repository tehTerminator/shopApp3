import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PosItemService } from './../../../../../../shared/services/posItem/pos-item.service';
import { ProductService } from './../../../../../../shared/services/product/product.service';
import { LedgerService } from './../../../../../../shared/services/ledger/ledger.service';
import { Ledger, PosItem, PosItemTemplate, Product } from '../../../../../../shared/collection';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pos = 0;
  templates: PosItemTemplate[] = [];
  private sub: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private ledgerService: LedgerService,
    private posItemService: PosItemService
  ) { }

  ngOnInit(): void {
    this.productService.init();
    this.ledgerService.init();
    this.posItemService.init();

    this.sub = this.posItems.subscribe(
      (items) => {
        try {
          const temp = items.find(x => x.id === this.pos).templates;
          if (temp === undefined) {
            this.templates = [];
          } else {
            this.templates = temp;
          }
        } catch (e) {
          console.log('PosItem Not Found');
          this.templates = [];
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.pos;

    if (change.currentValue !== change.previousValue) {
      this.pos = change.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  get posItems(): Observable<PosItem[]> {
    return this.posItemService.getAsObservable() as Observable<PosItem[]>;
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

}
