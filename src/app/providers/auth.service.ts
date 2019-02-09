import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  private user: firebase.User;

  constructor(private af: AngularFireAuth) {
    af.authState.subscribe(user => {
      this.user = user;
    });
  }

  get authstate() {
    return this.af.authState;
  }

  signin(email: string, password: string): Promise<auth.UserCredential> {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  get userdata() {
    return this.user;
  }
}
