import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { ApiService } from './../../../../shared/services/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegistrationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notice: NotificationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      displayName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userRegistrationForm.invalid) {
      this.notice.showError('Form Error', 'Invalid Data Provided');
      return;
    }

    this.api.create('users', {
      displayName: this.displayName.value,
      username: this.username.value,
      password: this.password.value
    })
    .subscribe((response) => {
      this.notice.showSuccess('Success', 'User Created Successfully');
      this.router.navigate(['/user', 'sign-in']);
    }, error => {
      console.log(error);
      this.notice.showError('Error', 'An Unknown Error Was Encountered');
    });
  }

  get displayName(): FormControl {
    return this.userRegistrationForm.get('displayName') as FormControl;
  }

  get username(): FormControl {
    return this.userRegistrationForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.userRegistrationForm.get('password') as FormControl;
  }


}
