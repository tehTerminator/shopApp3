import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STRING, Product } from '../../../../../shared/collection';
import { NotificationService } from '../../../../../shared/services/notification/notification.service';
import { ProductService } from '../../../../../shared/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: 0,
      title: ['', [Validators.required, Validators.pattern(STRING)]],
      rate: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onIdFieldChange(): void {
    const id = this.id.value;
    if (id > 0) {
      try{
        const product = this.productService.getElementById(id) as Product;
        this.productForm.patchValue({
          title: product.title,
          rate: product.rate
        });
        return;
      } catch (e) {
        this.ns.showError('Error', e);
      }
    }
    this.productForm.reset();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.ns.showError('Form Error', 'Invalid Data in Form');
      return;
    }

    if (this.editMode) {
      this.productService.update(this.productForm.value)
      .subscribe(() => {
        this.productForm.reset();
        this.ns.showSuccess('Success', 'Product Updated Successfully');
      }, error => {
        this.ns.showError('Error', 'Unable to Update Product');
        console.log(error);
      });
    } else {
      this.productService.create(this.productForm.value)
      .subscribe(() => {
        this.productForm.reset();
        this.ns.showSuccess('Success', 'Product Created Successfully');
      }, () => {
        this.ns.showError('Error', 'Unable to Create New Product');
      });
    }
  }

  get id(): FormControl {
    return this.productForm.get('id') as FormControl;
  }

  get title(): FormControl {
    return this.productForm.get('title') as FormControl;
  }

  get rate(): FormControl {
    return this.productForm.get('rate') as FormControl;
  }

  get editMode(): boolean {
    return this.id.value > 0;
  }

}
