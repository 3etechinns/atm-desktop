import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { BankAuthService } from '@atmhotspot/bank';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authSvc: BankAuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authSvc.isloggedIn());
    if (!this.authSvc.isloggedIn()) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth/signin'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
