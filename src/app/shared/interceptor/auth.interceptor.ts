import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './../services/auth/auth-state.service';
import { AuthState } from '../collection';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authState: AuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authState.currentState === AuthState.LOGGED_IN) {
      const token = this.authState.token;
      const newRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });

      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
