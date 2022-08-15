import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from './../../../../shared/services/auth/auth-state.service';
import { AuthService } from './../../../../shared/services/auth/auth.service';
import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { ALPHA, AuthState } from './../../../../shared/collection';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('openClose', [
      state('in', style({
        opacity: 1,
        left: 0,
      })),
      state('void', style({
        opacity: 0,
        left: -1000,
      })),
      transition('void => *', animate(500))
    ])
  ]
})
export class SignInComponent implements OnInit {
  signInForm: UntypedFormGroup = this.fb.group({});
  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(ALPHA)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.ns.showError('Invalid Form Data', 'Please Provide Username and Password');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.username, this.password)
    .subscribe((userData) => {
      this.isLoading = false;
      this.ns.showSuccess('Success', `Welcome ${userData.displayName}`);
      this.router.navigate(['/home']);
    }, error => {
      this.isLoading = false;
      this.ns.showError('Error Occurred', error);
    });
  }

  get username(): string {
    const username = this.usernameField.value;
    return !!username ? username : '';
  }

  get password(): string {
    const password = this.passwordField.value;
    return !!password ? password : '';
  }

  get usernameField(): UntypedFormControl {
    return this.signInForm.get('username') as UntypedFormControl;
  }

  get passwordField(): UntypedFormControl {
    return this.signInForm.get('password') as UntypedFormControl;
  }
}
