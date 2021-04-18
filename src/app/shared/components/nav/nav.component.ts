import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { AuthStateService } from './../../services/auth/auth-state.service';
import { AppDialog, AuthState, UserData } from './../../collection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Output() showDialog = new EventEmitter<AppDialog>();
  displayName = 'Anonymous';
  userSub: Subscription = new Subscription();

  constructor(private authState: AuthStateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authState.user.subscribe(user => {
      this.displayName = user.name;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  get loggedIn(): boolean {
    return this.authState.currentState === AuthState.LOGGED_IN;
  }

  signOut = () => this.authService.signOut();

  showCalculator = () => this.showDialog.emit(AppDialog.CALCULATOR);
  showNotification = () => this.showDialog.emit(AppDialog.NOTIFICATION);

}
