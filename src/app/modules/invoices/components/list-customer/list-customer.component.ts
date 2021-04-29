import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../../../../shared/collection';
import { CustomerService } from '../../services/customer.service';
import { InvoiceStoreService } from './../../services/invoice-store.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  searchText = '';

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private store: InvoiceStoreService
  ) { }

  ngOnInit(): void {
    this.customerService.init();
  }

  get customers(): Observable<Customer[]> {
    return this.customerService.getAsObservable() as Observable<Customer[]>;
  }

  onSelect(customer: Customer): void {
    this.store.customer = customer;
    this.router.navigate(['/invoices', 'create', 'list-items']);
  }
}
