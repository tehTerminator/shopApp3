import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Select Customer | ShopApp');
  }

}
