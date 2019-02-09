import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';
  isloading = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private ngzone: NgZone
  ) {}

  ngOnInit() {}

  login() {
    if (this.email.trim().length === 0 || this.password.length === 0) {
      return;
    }
    this.isloading = true;
    this.authSvc
      .signin(this.email, this.password)
      .then(
        user => {
          this.isloading = false;
          console.log(user, 'logged in just now');
          this.ngzone.run(() => this.router.navigate(['admin']));
        },
        err => {
          this.isloading = false;
        }
      )
      .catch(err => {
        this.isloading = false;
      });
  }
}
