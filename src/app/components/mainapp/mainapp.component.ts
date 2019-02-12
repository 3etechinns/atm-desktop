import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeAnimation } from '../../app.animations';
import { Subscription } from 'rxjs';
import { BankService, BankAuthService } from '@atmhotspot/bank';
import { BankData } from '@atmhotspot/bank/lib/bank.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainapp',
  templateUrl: './mainapp.component.html',
  styleUrls: ['./mainapp.component.scss'],
  animations: [fadeAnimation]
})
export class MainappComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  myData: BankData;

  private accountPoll: Subscription;

  constructor(private router: Router, private dataSvc: BankService, private authSvc: BankAuthService) {}

  ngOnInit() {
    this.accountPoll = this.dataSvc
      .getMyAccount()
      .subscribe(data => (this.myData = data.data));

    this.subscriptions.push(this.accountPoll);
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  signout(): void {
    this.authSvc.logout().then(() => this.router.navigate(['/auth/signin']));
  }
}
