import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STRING } from '../../../../shared/collection';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { CustomerService } from '../../services/customer.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createCustomerForm: FormGroup = new FormGroup({});
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(STRING)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.pattern(STRING)]);

  constructor(
    private router: Router,
    private store: InvoiceStoreService,
    private notification: NotificationService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.createCustomerForm.addControl('title', this.nameFormControl);
    this.createCustomerForm.addControl('address', this.addressFormControl);
  }

  onSubmit(): void {
    if (this.createCustomerForm.invalid) {
      this.notification.showError('Form Error', 'Invalid Data in Form');
      return;
    }

    this.customerService.create(this.createCustomerForm.value)
    .subscribe(customer => {
      this.
    })
  }

}
