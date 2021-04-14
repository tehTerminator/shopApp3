import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { AuthState, AuthStateService } from './../../services/auth/auth-state.service';
import { AppDialog } from './../../collection';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Output() showDialog = new EventEmitter<AppDialog>();

  constructor(private authState: AuthStateService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get loggedOut(): boolean {
    return this.authState.currentState === AuthState.LOGGED_OUT;
  }

  signOut = () => this.authService.signOut();

  showCalculator = () => this.showDialog.emit(AppDialog.CALCULATOR);
  showNotification = () => this.showDialog.emit(AppDialog.NOTIFICATION);
}
