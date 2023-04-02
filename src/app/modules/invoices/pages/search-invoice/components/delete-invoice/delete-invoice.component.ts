import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { ApiService } from './../../../../../../shared/services/api/api.service';
import { SearchInvoiceStoreService } from '../../search-invoice-store.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.css']
})
export class DeleteInvoiceComponent implements OnInit {

  constructor(
    private store: InvoiceStoreService,
    private listStore: SearchInvoiceStoreService
  ) { }

  ngOnInit(): void {  }

  private confirmDelete(): boolean {
    return confirm('Do You Really Want to Delete Invoice. This Operation is Irreversible');
  }

  deleteInvoice(): void {
    if (this.confirmDelete()) {
      this.listStore.deleteInvoice(this.store.invoice.value.id);
    }
  }
}
