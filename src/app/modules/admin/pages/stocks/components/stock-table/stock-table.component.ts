import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockItem } from '../../../../../../shared/collection';
import { StockItemService } from '../../../../../../shared/services/stocks/stocks.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements OnInit {

  get stocks(): Observable<StockItem[]> {
    return this.stockItemService.getAsObservable() as Observable<StockItem[]>;
  }

  constructor(private stockItemService: StockItemService) {}

  ngOnInit(): void {
    this.stockItemService.init();
  }
}
