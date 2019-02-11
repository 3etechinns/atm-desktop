import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { BankAuthService } from '@atmhotspot/bank';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';
  isloading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: BankAuthService,
    private iziToast: Ng2IzitoastService
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams.returnUrl || '/admin/dashboard';
  }

  login() {
    if (this.email.trim().length === 0) {
      this.iziToast.error({
        id: 'error',
        title: 'Error',
        message: 'Your Email is required.',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return;
    }
    if (this.password.trim().length === 0) {
      this.iziToast.error({
        id: 'error',
        title: 'Error',
        message: 'Your Password is required.',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return;
    }
    this.authSvc
      .login(this.email, this.password)
      .pipe(first())
      .subscribe(
        () => {
          this.iziToast.success({
            id: 'success',
            title: 'Success',
            message: 'We are preparing your dashboard, Please wait.',
            position: 'bottomRight',
            transitionIn: 'bounceInLeft'
          });
          setTimeout(() => this.router.navigateByUrl(this.returnUrl), 6000);
        },
        error => {
          this.iziToast.error({
            id: 'error',
            title: 'Error',
            message: 'Login was not successful. Try again',
            position: 'bottomRight',
            transitionIn: 'bounceInLeft'
          });
        }
      );
  }
}
