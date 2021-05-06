import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/services/api/api.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-wait-page',
  templateUrl: './wait-page.component.html',
  styleUrls: ['./wait-page.component.css']
})
export class WaitPageComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private store: InvoiceStoreService,
    private titleService: Title,
    private notificaitonService: NotificationService,
  ) { }

  ngOnInit(): void {

    if (this.store.invoice.value.transactions.length === 0) {
      this.router.navigate(['/invoices', 'create', 'select-customer']);
      this.notificaitonService.showError('Error', 'There are no Transactions');
      return;
    }

    this.titleService.setTitle('Saving Invoice | ShopApp');

    const invoice = this.store.invoice.value;
    this.apiService.create('invoices', invoice)
    .subscribe(
      () => {
        this.store.reset();
        this.notificaitonService.showSuccess('Success', 'Invoice Created Successfully');
        this.router.navigate(['/invoices', 'create', 'select-customer']);
        // this.router.navigate(['/invoices', 'create', 'paymentMethod']);
      },
      error => {
        console.error(error);
        this.notificaitonService.showError('Error', 'Unable to Store Invoice');
        this.router.navigate(['/invoices', 'create', 'paymentMethod']);
      }
    );
  }

}
