import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../collection';
import { AuthStateService } from './../services/auth/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authState: AuthStateService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authState.currentState === AuthState.LOGGED_IN) {
      return true;
    }

    return this.router.createUrlTree(['/user', 'sign-in']);
  }

}
