import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PosItemService } from './../../../../../../shared/services/posItem/pos-item.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LedgerService } from './../../../../../../shared/services/ledger/ledger.service';
import { ProductService } from './../../../../../../shared/services/product/product.service';
import { Ledger, PosItemTemplate, Product } from '../../../../../../shared/collection';
import { EMPTY, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { NotificationService } from '../../../../../../shared/services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pos = 0;
  templateForm: FormGroup = new FormGroup({});
  sub: Subscription = new Subscription();
  isProduct = true;
  private notifier = new Subject();

  constructor(
    private ns: NotificationService,
    private posItemService: PosItemService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.productService.init();
    this.ledgerService.init();

    this.templateForm = this.fb.group({
      id: 0,
      positem_id: [this.pos, [Validators.required, Validators.min(1)]],
      item_id: [0, [Validators.required, Validators.min(1)]],
      kind: ['PRODUCT', Validators.required],
      rate: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });

    this.kind.valueChanges
    .pipe(
      takeUntil(this.notifier)
    )
    .subscribe(
      value => {
        if (value === 'PRODUCT') {
          this.isProduct = true;
          return;
        }
        this.isProduct = false;
      }
    );

    this.item_id.valueChanges
    .pipe(
      takeUntil(this.notifier)
    ).subscribe(
      value => {
        if (this.kind.value === 'PRODUCT') {
          this.onProductSelect(value);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.pos;

    if (change.currentValue !== change.previousValue) {
      if (change.currentValue > 0) {
        this.templateForm.patchValue({
          positem_id: change.currentValue
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  private onReset(): void {
    this.templateForm.reset();
    this.templateForm.patchValue({
      id: 0,
      positem_id: this.pos
    });
  }

  onSubmit(): void {
    if (this.templateForm.invalid) {
      this.ns.showError('Form Error', 'Invalid Form Entries');
      return;
    }

    const payload: PosItemTemplate = this.templateForm.value;
    let response: Observable<any> = EMPTY;

    if (this.editMode) {
      response = this.posItemService.updateTemplate(payload);
    } else {
      response = this.posItemService.createTemplate(payload);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<any>): void {
    const successMessage = this.editMode ? 'Update Success' : 'Template Created Success';

    response.subscribe(
      () => {
        this.ns.showSuccess('Success', successMessage);
        this.onReset();
      },
      error => {
        this.ns.showError('Error', error);
      }
    );
  }

  onProductSelect(id: number): void {
    try{
      const product = this.productService.getElementById(id) as Product;
      this.templateForm.patchValue({
        rate: product.rate
      });
    } catch (e) {
      console.log(e);
    }
  }

  get editMode(): boolean {
    return this.id.value > 0;
  }

  get products(): Observable<Product[]> {
    return this.productService.getAsObservable() as Observable<Product[]>;
  }

  get ledgers(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable() as Observable<Ledger[]>;
  }

  get id(): FormControl {
    return this.templateForm.get('id') as FormControl;
  }

  get positem_id(): FormControl {
    return this.templateForm.get('positem_id') as FormControl;
  }

  get item_id(): FormControl {
    return this.templateForm.get('item_id') as FormControl;
  }

  get kind(): FormControl {
    return this.templateForm.get('kind') as FormControl;
  }

  get rate(): FormControl {
    return this.templateForm.get('rate') as FormControl;
  }

  get quantity(): FormControl {
    return this.templateForm.get('quantity') as FormControl;
  }
}
