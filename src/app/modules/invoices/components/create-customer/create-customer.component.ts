import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer, STRING } from '../../../../shared/collection';
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
    this.nameFormControl.setValidators([
      Validators.required,
      Validators.min(3),
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z ]+$')
    ]);
    this.nameFormControl.setAsyncValidators(this.customerNameValidator.bind(this));
    this.addressFormControl.setValidators([Validators.required, Validators.minLength(5)]);
  }

  onSubmit(): void {
    if (this.createCustomerForm.invalid) {
      this.notification.showError('Form Error', 'Invalid Data in Form');
      return;
    }

    this.customerService.create(this.createCustomerForm.value)
      .subscribe(customer => {
        this.store.customer = customer;
        this.router.navigate(['/invoices', 'create', 'list-items']);
      },
        error => {
          this.notification.showError('Error', error);
        }
      );
  }

  customerNameValidator(control: AbstractControl): Promise<ValidationErrors|null> {
    const promise = new Promise<ValidationErrors|null>((resolve, reject) => {
      const name = control.value;
      const customer = (this.customerService.getAsList() as Customer[]).find( x => x.title.toLowerCase() === name.toLowerCase());
      if (customer === undefined) {
        resolve(null);
      } else {
        const error: ValidationErrors = {customerExists: true};
        resolve(error);
      }
    });
    return promise;
  }

}
