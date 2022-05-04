import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralItem } from '../../../../shared/collection';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Title } from '@angular/platform-browser';
import { GeneralItemStoreService } from './../../services/general-item-store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  itemField = new FormControl(null, Validators.required);
  itemForm = new FormGroup({item: this.itemField});
  filteredItems: Observable<GeneralItem[]> = EMPTY;
  @ViewChild('item') input!: ElementRef<HTMLInputElement>;

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

    this.filteredItems = this.itemField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  onSubmit(): void {
    try {
      this.store.selectedItem = this.itemStore.selectActualItem(this.itemField.value);
      this.router.navigate(['/invoices', 'create', 'transactions']);
    } catch (e) {
      this.notification.showError('Error', 'Item Not Found');
    }
  }

  displayFn(item: GeneralItem): string {
    return item && item.title ? item.title : '';
  }

  private _filter(title: string): GeneralItem[] {
    try{
      const t = title.toLowerCase();
      return this.items.filter(x => x.title.toLowerCase().includes(t));
    }
    catch (e) {
      return this.items;
    }
  }

  get items(): GeneralItem[] {
    return this.itemStore.items;
  }
}

