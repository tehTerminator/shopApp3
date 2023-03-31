import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { Customer } from '../../../../shared/collection';
import { CustomerService } from '../../services/customer.service';
import { InvoiceStoreService } from './../../services/invoice-store.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit, AfterViewInit {
  // searchText = '';
  @ViewChild('customerTextField') input!: ElementRef<HTMLInputElement>;
  customerField = new UntypedFormControl(null, Validators.required);
  customerForm = new UntypedFormGroup({customer: this.customerField});
  filteredCustomer: Observable<Customer[]> = EMPTY;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private store: InvoiceStoreService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.customerService.init();
    this.filteredCustomer = this.customerField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    if (this.input !== null){
      this.input.nativeElement.focus();
    }
  }

  private _filter(title: string): Customer[] {
    const customer = this.customerService.getAsList() as Customer[];
    try{
      const t = title.toLowerCase();
      return customer.filter(
        x => x.title.toLowerCase().indexOf(t) >= 0
      );
    } catch (e) {
      return customer;
    }
  }

  onSubmit(): void {
    const customer = (this.customerForm.get('customer') as UntypedFormControl).value;
    if ('title' in customer && 'address' in customer) {
      this.store.customer = customer;
      this.router.navigate(['/invoices', 'create', 'list-items']);
    }
  }

  get customers(): Observable<Customer[]> {
    return this.customerService.getAsObservable() as Observable<Customer[]>;
  }

  displayFn(customer: Customer): string {
    return customer && customer.title ? customer.title : '';
  }

  // onSelect(customer: Customer): void {
  //   this.store.customer = customer;
  //   this.router.navigate(['/invoices', 'create', 'list-items']);
  // }
}
