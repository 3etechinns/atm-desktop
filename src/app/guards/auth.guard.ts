import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private afAuth: AngularFireAuth) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState !== null;
  }
}
