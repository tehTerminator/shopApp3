import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { ApiService } from './../../../../shared/services/api/api.service';
import { ALPHA, STRING } from './../../../../shared/collection';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegistrationForm: FormGroup = new FormGroup({});
  isLoading = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notice: NotificationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      displayName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern(STRING)
      ], [this.displayNameValidator.bind(this)]],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern(ALPHA)],
        [this.usernameValidator.bind(this)]
      ],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.userRegistrationForm.invalid) {
      this.notice.showError('Form Error', 'Invalid Data Provided');
      return;
    }

    this.isLoading = true;

    this.api.create('users', {
      displayName: this.displayName.value,
      username: this.username.value,
      password: this.password.value
    })
      .subscribe((response) => {
        this.isLoading = false;
        this.notice.showSuccess('Success', 'User Created Successfully');
        this.router.navigate(['/user', 'sign-in']);
      }, error => {
        this.isLoading = false;
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

  usernameValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const username = control.value;
      this.api.select<{ count: number }>('username', { username })
        .subscribe(
          (response) => {
            if (response.count > 0) {
              const error: ValidationErrors = { usernameExist: true };
              resolve(error);
            }
            resolve(null);
          },
          (error) => {
            resolve(null);
          }
        );
    });
    return promise;
  }

  displayNameValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const displayName = control.value;
      this.api.select<{ count: number }>('displayName', { displayName })
        .subscribe(
          (response) => {
            if (response.count > 0) {
              const error: ValidationErrors = { displayNameExists: true };
              resolve(error);
            }
            resolve(null);
          },
          (error) => {
            resolve(null);
          }
        );
    });
    return promise;
  }
}
