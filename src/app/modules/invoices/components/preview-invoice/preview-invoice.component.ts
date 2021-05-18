import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../services/invoice-store.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styles: []
})
export class PreviewInvoiceComponent implements OnInit {
  constructor(private store: InvoiceStoreService) { }

  ngOnInit(): void {
    this.store.reset();
  }
}
