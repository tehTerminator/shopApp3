import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState, AuthStateService } from '../../auth/auth-state.service';
import { AuthService } from './../../auth/auth.service';

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
    // private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      // this.snackBar.open('Invalid Form Data', 'DISMISS', {duration: 5000});
      return;
    }

    this.authService.login(this.username, this.password)
    .subscribe(() => {
      this.router.navigate(['/home']);
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
