import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LedgerService } from './../../../../../shared/services/ledger/ledger.service';
import { NotificationService } from './../../../../../shared/services/notification/notification.service';
import { ALPHA_NUM, Ledger } from './../../../../../shared/collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  readonly groups = ['BANK', 'CASH', 'PAYABLES', 'RECEIVABLES', 'EXPENSE'];
  ledgerForm: FormGroup = this.fb.group({
    id: [0, Validators.min(0)],
    title: ['', [Validators.required, Validators.pattern(ALPHA_NUM)]],
    group: ['', Validators.required]
  });
  sub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private ledgerService: LedgerService
  ) { }

  ngOnInit(): void {
  }

  onIdFieldChange(): void {
    try{
      const ledger = this.ledgerService.getElementById(this.id) as Ledger;
      this.ledgerForm.patchValue({
        title: ledger.title,
        group: ledger.group
      });
    } catch (e) {
      this.ledgerForm.reset();
      this.notification.showError('Error', e);
    }
  }

  onSubmit(): void {
    if (this.ledgerForm.invalid) {
      this.notification.showError('Form Error', 'Please Fix Errors in Your Form');
      return;
    }

    if (this.editMode) {
      this.ledgerService.update(this.ledgerForm.value)
      .subscribe(() => {
        this.ledgerForm.reset();
        this.notification.showSuccess('Success', 'Ledger Updated Success');
      });
    } else {
      this.ledgerService.create(this.ledgerForm.value)
      .subscribe((ledger) => {
        this.ledgerForm.reset();
        this.notification.showSuccess('Ledger Created', `New Ledger Created ${ledger.title} - #${ledger.id}`);
      });
    }
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

  get group(): string {
    return this.groupField.value;
  }

  get idField(): FormControl {
    return this.ledgerForm.get('id') as FormControl;
  }

  get titleField(): FormControl {
    return this.ledgerForm.get('title') as FormControl;
  }

  get groupField(): FormControl{
    return this.ledgerForm.get('group') as FormControl;
  }
}

