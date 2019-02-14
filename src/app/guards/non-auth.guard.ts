import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { BankAuthService } from '@atmhotspot/bank';

@Injectable()
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router, private authSvc: BankAuthService) {}

  canActivate() {
    if (this.authSvc.isTokenExpired()) {
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/admin/dashboard']);
    return false;
  }
}
