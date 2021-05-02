import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { AuthStateService } from './../../services/auth/auth-state.service';
import { AppDialog, AuthState, UserData } from './../../collection';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Output() showDialog = new EventEmitter<AppDialog>();
  displayName = 'Anonymous';
  notifier = new Subject();
  isExpanded = false;

  constructor(private authState: AuthStateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authState.user
    .pipe(takeUntil(this.notifier))
    .subscribe(user => {
      this.displayName = user.name;
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  get loggedIn(): boolean {
    return this.authState.currentState === AuthState.LOGGED_IN;
  }

  signOut = () => this.authService.signOut();

  showCalculator = () => this.showDialog.emit(AppDialog.CALCULATOR);
  showNotification = () => this.showDialog.emit(AppDialog.NOTIFICATION);

}
