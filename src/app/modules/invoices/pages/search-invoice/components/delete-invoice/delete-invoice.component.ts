import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { ApiService } from './../../../../../../shared/services/api/api.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {

  constructor(
    private store: InvoiceStoreService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

  private confirmDelete(): boolean {
    return confirm('Do You Really Want to Delete Invoice. This Operation is Irreversible');
  }

  deleteInvoice(): void {
    if( this.confirmDelete() ) {
      this.api.delete('invoices', this.store.invoice.value.id);
    }
  }
}
