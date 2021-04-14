import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AppDialog } from '../../shared/collection';
import { AuthState, AuthStateService } from './../../auth/auth-state.service';

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
