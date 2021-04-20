import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PosItem } from '../../../../../../shared/collection';
import { NotificationService } from '../../../../../../shared/services/notification/notification.service';
import { PosItemService } from './../../../../../../shared/services/posItem/pos-item.service';

@Component({
  selector: 'app-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrls: ['./pos-form.component.css']
})
export class PosFormComponent implements OnInit {
  posForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private posService: PosItemService,
    private fb: FormBuilder,
    private ns: NotificationService) { }

  ngOnInit(): void {
    this.posForm = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.posForm.invalid) {
      this.ns.showError('Form Error', 'Invalid Values in POS Form');
      return;
    }

    if (this.editMode) {
      this.handleResponse(this.posService.update(this.posForm.value));
    } else {
      this.handleResponse(this.posService.create(this.posForm.value));
    }
  }

  private handleResponse(response: Observable<PosItem>): void {
    const successMessage = this.editMode ? 'PosItem Updated Successfully' : 'PosItem Created Successfully';

    response.subscribe(
      (data) => {
        this.ns.showSuccess('Success', successMessage);
        this.posForm.reset();
        this.router.navigate(['/admin', 'pos-item', data.id , 'template']);
      },
      error => {
        this.ns.showError('Error', error);
      }
    );
  }

  get editMode(): boolean {
    return this.id.value > 0;
  }

  get id(): FormControl {
    return this.posForm.get('id') as FormControl;
  }

  get title(): FormControl {
    return this.posForm.get('title') as FormControl;
  }

  get rate(): FormControl {
    return this.posForm.get('rate') as FormControl;
  }


}
