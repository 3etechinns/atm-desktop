import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../providers/data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Bank } from '../../../data/bank';
import { Subscription } from 'rxjs';
import { map, filter, first, tap, flatMap } from 'rxjs/operators';
import { AuthService } from '../../../providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  bank: Bank;

  private bankDataSubscription: Subscription;

  constructor(
    private router: Router,
    private dataSvc: DataService,
    private ngzone: NgZone,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.bankDataSubscription = this.authSvc.authstate
      .pipe(
        flatMap(user => {
          return this.dataSvc.getUserData(user.uid);
        })
      )
      .subscribe(bank => {
        this.bank = bank.payload.val();
      });
  }

  logout() {}

  ngOnDestroy() {
    if (this.bankDataSubscription) {
      this.bankDataSubscription.unsubscribe();
    }
  }
}
