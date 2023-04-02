import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LedgerService } from '../../../../../shared/services/ledger/ledger.service';
import { NotificationService } from '../../../../../shared/services/notification/notification.service';
import { STRING, Ledger } from '../../../../../shared/collection';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.css']
})
export class LedgerFormComponent implements OnInit {
  readonly kinds = ['BANK', 'CASH', 'WALLET', 'PAYABLE', 'RECEIVABLE', 'EXPENSE', 'INCOME'];
  ledgerForm: UntypedFormGroup = new UntypedFormGroup({});
  sub = new Subscription();
  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private notification: NotificationService,
    private ledgerService: LedgerService
  ) { }

  ngOnInit(): void {
    this.ledgerForm = this.fb.group({
      id: [0, Validators.min(0)],
      title: ['', [Validators.required, Validators.pattern(STRING)]],
      kind: ['', Validators.required]
    });
  }

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.id > 0) {
      try{
        const ledger = this.ledgerService.getElementById(this.id) as Ledger;
        this.ledgerForm.patchValue({
          title: ledger.title,
          kind: ledger.kind
        });
        this.isLoading = false;
      } catch (e) {
        this.ledgerForm.reset();
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.ledgerForm.invalid) {
      this.notification.showError('Form Error', 'Please Fix Errors in Your Form');
      return;
    }

    this.isLoading = true;
    let response:Observable<Ledger> = EMPTY;

    if (this.editMode) {
      response = this.ledgerService.update(this.ledgerForm.value);
    } else {
      response = this.ledgerService.create(this.ledgerForm.value);
    }

    this.handleResponse(response);
  }

  private handleResponse(ledger: Observable<any>): void {
    let message = '';
    if (this.editMode) {
      message = 'Updated Successfully';
    } else {
      message = 'Created Successfully';
    }

    ledger.subscribe(
      () => {
        this.isLoading = false;
        this.notification.showSuccess('Success', message);
        this.ledgerForm.reset();
      },
      error => {
        this.notification.showError('Error', error);
        this.isLoading = false;
      }
    );
  }

  get editMode(): boolean {
    return this.id > 0;
  }

  get id(): number {
    return this.idField.value;
  }

  get title(): string {
    return this.titleField.value;
  }

  get kind(): string {
    return this.kindField.value;
  }

  get idField(): UntypedFormControl {
    return this.ledgerForm.get('id') as UntypedFormControl;
  }

  get titleField(): UntypedFormControl {
    return this.ledgerForm.get('title') as UntypedFormControl;
  }

  get kindField(): UntypedFormControl{
    return this.ledgerForm.get('kind') as UntypedFormControl;
  }
}

