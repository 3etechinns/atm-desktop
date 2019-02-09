import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { ATM } from '../../../data/atm';
import { AuthService } from '../../../providers/auth.service';
import { Report } from '../../../data/report';
import { Observable, zip, Subscription, forkJoin } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
declare let jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  atmList: ATM[] = [];
  reportsList: Report[] = [];

  private atmSub: Subscription;
  private reportSub: Subscription;

  constructor(private dataSvc: DataService, private authSvc: AuthService) {}

  ngOnInit() {
    this.init();

    $(window).resize(function() {
      jQuery('#myBox').css(
        'max-height',
        $(window).height() - $('.main-header').height() - 140
      );
    });

    this.atmSub = this.authSvc.authstate
      .pipe(
        flatMap(user => {
          return this.dataSvc.getMyATMs(user.uid);
        })
      )
      .subscribe(result => {
        this.atmList = result;
      });

    this.reportSub = this.authSvc.authstate
      .pipe(
        flatMap(user => {
          return this.dataSvc.getMyReports(user.uid);
        })
      )
      .subscribe(result => (this.reportsList = result));
  }

  init() {
    jQuery('#myBox').css(
      'max-height',
      $(window).height() - $('.main-header').height() - 140
    );
  }

  ngOnDestroy() {
    if (this.atmSub) {
      this.atmSub.unsubscribe();
    }
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }
}
