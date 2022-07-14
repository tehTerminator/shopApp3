import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.component.html',
  styleUrls: ['./choose-payment-method.component.css']
})
export class ChoosePaymentMethodComponent implements OnInit {
  constructor(
    private titleService: Title,
    private store: InvoiceStoreService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.store.customer.id === 0) {
      this.router.navigate(['/invoices', 'create', 'select-customer']);
      return;
    }

    if (this.store.selectedItem.id === 0) {
      this.router.navigate(['/invoices', 'create', 'list-items']);
      return;
    }

    if (this.store.invoice.value.transactions.length === 0) {
      this.router.navigate(['/invoices', 'create', 'list-items']);
      return;
    }

    this.titleService.setTitle('Select Payment Method | ShopApp');
  }
}
