import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockItem } from './../../../../../../shared/collection';
import { NotificationService } from './../../../../../../shared/services/notification/notification.service';
import { StockItemService } from './../../../../../../shared/services/stocks/stocks.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  stockForm: FormGroup<StockForm>;
  isLoading = false;

  ngOnInit(): void {
    const fb = new FormBuilder();
    this.stockForm = fb.nonNullable.group({
      id: [0, [Validators.min(0)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [0, [Validators.min(0), Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.stockForm.invalid) {
      return;
    }

    if (this.editMode) {
      this.stockItemService.update(this.payload)
        .subscribe(() => this.stockForm.reset());
      return;
    }

    this.stockItemService.create(this.payload)
      .subscribe(() => this.stockForm.reset());
  }

  onIdFieldChange(): void {
    const id: number = this.idField.value;

    if (id <= 0) {
      this.stockForm.reset();
      return;
    }

    try{
      const item = this.stockItemService.getElementById(id) as StockItem;
      this.stockForm.setValue({
        id: item.id,
        title: item.title,
        quantity: item.quantity
      });
    } catch (e) {
      this.stockForm.reset();
      this.ns.showError('Item Not Found', 'Stock Item not Found');
    }

  }


  get idField(): FormControl<number> {
    return this.stockForm.get('id') as FormControl<number>;
  }

  get titleField(): FormControl<string> {
    return this.stockForm.get('title') as FormControl<string>;
  }

  get quantityField(): FormControl<number> {
    return this.stockForm.get('quantity') as FormControl<number>;
  }

  get editMode(): boolean {
    return this.idField.value > 0;
  }

  get payload(): StockItem {
    return this.stockForm.value as StockItem;
  }

  constructor(
    private stockItemService: StockItemService,
    private ns: NotificationService,
  ) { }

}

interface StockForm {
  id: FormControl<number>;
  title: FormControl<string>;
  quantity: FormControl<number>;
}
