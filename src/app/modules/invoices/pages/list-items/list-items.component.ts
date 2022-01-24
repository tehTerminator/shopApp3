import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralItem } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Title } from '@angular/platform-browser';
import { GeneralItemStoreService } from './../../services/general-item-store.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  searchText = '';
  constructor(
    private router: Router,
    private store: InvoiceStoreService,
    private itemStore: GeneralItemStoreService,
    private notification: NotificationService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    if (this.store.customer.id === 0) {
      this.router.navigate(['/invoices', 'create', 'select-customer']);
    }
    this.itemStore.init();
    this.titleService.setTitle('Select Invoice Item | ShopApp');
  }

  onSelect(item: GeneralItem): void {
    try {
      this.store.selectedItem = this.itemStore.selectActualItem(item);
      this.router.navigate(['/invoices', 'create', 'transactions']);
    } catch (e) {
      this.notification.showError('Error', 'Item Not Found');
    }
  }

  get items(): GeneralItem[] {
    return this.itemStore.items;
  }
}

