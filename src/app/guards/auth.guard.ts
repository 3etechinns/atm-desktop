import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public jwtHelper: JwtHelperService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.jwtHelper.isTokenExpired()) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/banks/auth'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
