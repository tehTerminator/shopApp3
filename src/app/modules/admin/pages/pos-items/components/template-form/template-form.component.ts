import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PosItemService } from './../../../../../../shared/services/posItem/pos-item.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
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
  templateForm: UntypedFormGroup = new UntypedFormGroup({});
  sub: Subscription = new Subscription();
  isProduct = true;
  private notifier = new Subject();
  private _loading = false;

  constructor(
    private ns: NotificationService,
    private posItemService: PosItemService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private fb: UntypedFormBuilder,
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
    this._loading = true;

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
      },
      () => this._loading = false;
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

  get id(): UntypedFormControl {
    return this.templateForm.get('id') as UntypedFormControl;
  }

  get positem_id(): UntypedFormControl {
    return this.templateForm.get('positem_id') as UntypedFormControl;
  }

  get item_id(): UntypedFormControl {
    return this.templateForm.get('item_id') as UntypedFormControl;
  }

  get kind(): UntypedFormControl {
    return this.templateForm.get('kind') as UntypedFormControl;
  }

  get rate(): UntypedFormControl {
    return this.templateForm.get('rate') as UntypedFormControl;
  }

  get quantity(): UntypedFormControl {
    return this.templateForm.get('quantity') as UntypedFormControl;
  }

  get loading(): boolean {
    return this._loading;
  }
}
