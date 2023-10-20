import { Component} from '@angular/core';
import { DayBookService } from './services/day-book.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css']
})
export class DayBookComponent{
  dataToDisplay: Rows[] = [
      {
        creditor: 'BANK,WALLET,CASH',
        debtor: 'RECEIVABLE',
        title: 'Online Payments'
      },
      {
        creditor: 'RECEIVABLE',
        debtor: 'BANK,WALLET,CASH',
        title: 'Receipts'
      },
      {
        creditor:'BANK,WALLET,CASH',
        debtor:'BANK,WALLET',
        title:'Contra'
      },
      {
        creditor: 'CASH',
        debtor: 'CASH',
        title: 'Cash to Cash'
      },
      {
        creditor: 'BANK,WALLET,CASH',
        debtor: 'EXPENSE',
        title: 'EXPENSES'
      },
      {
        creditor: 'INCOME',
        debtor: 'BANK,WALLET,CASH,RECEIVABLE,PAYABLE',
        title: 'INCOME'
      },
      {
        creditor: 'BANK,WALLET,CASH',
        debtor: 'PAYABLE',
        title: 'To Payable'
      },
      {
        creditor: 'PAYABLE',
        debtor: 'BANK,WALLET,CASH',
        title: 'From Payable'
      },
  ];

  get loading(): boolean {
    return this.dayBookService.loading;
  }

  get length(): number {
    return this.dayBookService.dayBook.value.length;
  }



  constructor(private dayBookService: DayBookService) {}
}

interface Rows {
  creditor: string,
  debtor: string,
  title: string
};
