import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoiceStoreService } from '../../modules/invoices/services/invoice-store.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRouteGuard implements CanActivate {

  constructor(private router: Router, private store: InvoiceStoreService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean
    | UrlTree>
    | Promise<boolean
    | UrlTree>
    | boolean
    | UrlTree {
        console.log(state.url);
        return true;
  }
}
