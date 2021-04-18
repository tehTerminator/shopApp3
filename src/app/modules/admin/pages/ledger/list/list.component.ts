import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ledger } from './../../../../../shared/collection';
import { LedgerService } from './../../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private ledgerService: LedgerService, private http: HttpClient) { }

  ngOnInit(): void {
    this.ledgerService.init(true);
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObervable() as Observable<Ledger[]>;
  }
}
