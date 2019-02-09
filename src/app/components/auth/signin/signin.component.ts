import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

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
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams.returnUrl || '/admin/dashboard';
  }

  login() {
    this.authSvc
      .login(this.email, this.password)
      .pipe(first())
      .subscribe(
        () => this.router.navigateByUrl(this.returnUrl),
        error => console.log(`${error.toString()} occurred`)
      );
  }
}
