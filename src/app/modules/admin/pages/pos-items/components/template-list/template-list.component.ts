import { Component, OnInit } from '@angular/core';
import { PosItemService } from './../../../../../../shared/services/posItem';
import { ProductService } from './../../../../../../shared/services/product/product.service';
import { LedgerService } from './../../../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private ledgerService: LedgerService,
    private posItemService: PosItemService
  ) { }

  ngOnInit(): void {
    this.productService.init();
    this.ledgerService.init();
  }

}
