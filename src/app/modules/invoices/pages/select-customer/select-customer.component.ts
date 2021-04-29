import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {

  constructor(private store: InvoiceStoreService) { }

  ngOnInit(): void {
    this.store.reset();
  }

}
