import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  userRegistrationForm: FormGroup<UserRegistrationForm>;
  isLoading = false;
  hide = true;

  constructor(
    private notice: NotificationService,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const formBuilder = new FormBuilder();
    this.userRegistrationForm = formBuilder.nonNullable.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
        Validators.pattern(STRING)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.pattern(ALPHA)],
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
      title: this.title.value,
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

  get title(): FormControl<string> {
    return this.userRegistrationForm.get('title') as FormControl<string>;
  }

  get username(): FormControl<string> {
    return this.userRegistrationForm.get('username') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.userRegistrationForm.get('password') as FormControl<string>;
  }

  // usernameValidator(control: FormControl<string>): Promise<ValidationErrors | null> {
  //   const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
  //     const username = control.value;
  //     this.api.select<{ count: number }>('username', { username })
  //       .subscribe(
  //         (response) => {
  //           if (response.count > 0) {
  //             const error: ValidationErrors = { usernameExist: true };
  //             resolve(error);
  //           }
  //           resolve(null);
  //         },
  //         () => {
  //           resolve(null);
  //         }
  //       );
  //   });
  //   return promise;
  // }

  // titleValidator(control: FormControl<string>): Promise<ValidationErrors | null> {
  //   const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
  //     const title = control.value;
  //     this.api.select<{ count: number }>('title', { title })
  //       .subscribe(
  //         (response) => {
  //           if (response.count > 0) {
  //             const error: ValidationErrors = { titleExists: true };
  //             resolve(error);
  //           }
  //           resolve(null);
  //         },
  //         (error) => {
  //           resolve(null);
  //         }
  //       );
  //   });
  //   return promise;
  // }
}

interface UserRegistrationForm {
  title: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
}
