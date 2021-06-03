import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { Invoice } from './../../../../shared/collection';
import { ApiService } from './../../../../shared/services/api/api.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent implements OnInit {
  constructor(
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Search Invoices | ShopApp');
  }
}
