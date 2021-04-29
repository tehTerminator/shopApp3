import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { Invoice } from './../../../../shared/collection';
import { ApiService } from './../../../../shared/services/api/api.service';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  invoices: Invoice[] = [];

  constructor(
    private store: InvoiceStoreService,
    private formBuilder: FormBuilder, 
    private api: ApiService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      createdAt: [0, Validators.required]
    });
  }

  onSubmit(): void {
    this.api.select<Invoice[]>('invoices', {createdAt: this.date})
    .subscribe(
      (data) => this.invoices = data
    );
  }

  selectInvoice(invoice: Invoice): void {
    this.api.select<Invoice>('invoices', {id: invoice.id.toString()})
    .subscribe(
      (data) => this.store.invoice.next(data)
    );
  }

  get createdAtField(): FormControl {
    return this.searchForm.get('createdAt') as FormControl;
  }

  get date(): string {
    return this.createdAtField.value;
  }

}
