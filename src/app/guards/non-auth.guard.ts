import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtHelper.isTokenExpired()) {
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/banks/me']);
    return false;
  }
}
