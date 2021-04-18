import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from './../../../../shared/services/auth/auth-state.service';
import { AuthService } from './../../../../shared/services/auth/auth.service';
import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { AuthState } from './../../../../shared/collection';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router,
    private ns: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.ns.showError('Invalid Form Data', 'Please Provide Username and Password');
      return;
    }

    this.authService.login(this.username, this.password)
    .subscribe((userData) => {
      this.ns.showSuccess('Success', `Welcome ${userData.displayName}`);
      this.router.navigate(['/home']);
    }, error => {
      this.ns.showError('Error Occurred', error);
    });
  }

  get isLoading(): boolean {
    return this.authState.currentState === AuthState.STARTED;
  }

  get username(): string {
    const username = this.usernameField.value;
    return !!username ? username : '';
  }

  get password(): string {
    const password = this.passwordField.value;
    return !!password ? password : '';
  }

  get usernameField(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  get passwordField(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }
}
