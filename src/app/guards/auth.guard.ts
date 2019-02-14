import { Injectable, ViewChild } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { BankAuthService } from '@atmhotspot/bank';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  @ViewChild('loginSwal') loginSwal: SwalComponent;

  constructor(private router: Router, public authSvc: BankAuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authSvc.isTokenExpired()) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth/signin'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authSvc.isTokenExpired()) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth/signin'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
