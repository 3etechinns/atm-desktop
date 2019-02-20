import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { BankAuthService } from '@codekeyz/ng-atmbank';

@Injectable()
export class NonAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authSvc: BankAuthService) {}

  canActivate() {
    if (this.authSvc.isTokenExpired()) {
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/admin/dashboard']);
    return false;
  }

  canActivateChild() {
    if (this.authSvc.isTokenExpired()) {
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/admin/dashboard']);
    return false;
  }
}
