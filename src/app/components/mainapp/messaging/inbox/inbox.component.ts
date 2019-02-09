import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../providers/data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../providers/auth.service';
import { map, flatMap } from 'rxjs/operators';
import { Report } from '../../../../data/report';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, OnDestroy {
  reportsList: Report[] = [];
  reportSub: Subscription;

  constructor(private authSvc: AuthService, private dataSvc: DataService) {}

  ngOnInit() {
    this.reportSub = this.authSvc.authstate
      .pipe(
        flatMap(user => {
          return this.dataSvc.getMyReports(user.uid);
        })
      )
      .subscribe(datalist => (this.reportsList = datalist));
  }

  ngOnDestroy() {
    if (this.reportSub) {
      this.reportSub.unsubscribe();
    }
  }
}
