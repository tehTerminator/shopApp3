import { Component, OnInit } from '@angular/core';
import { AuthState, AuthStateService } from './../../auth/auth-state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authState: AuthStateService) { }

  ngOnInit(): void {
  }

  get loggedOut(): boolean {
    return this.authState.currentState === AuthState.LOGGED_OUT;
  }
}
