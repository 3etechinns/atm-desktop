import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { ATMData } from '../../../app.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myatms',
  templateUrl: './myatms.component.html',
  styleUrls: ['./myatms.component.scss']
})
export class MyatmsComponent implements OnInit, OnDestroy {
  atmList: ATMData[] = [];

  subscriptions: Subscription[] = [];

  atmSub: Subscription;

  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    this.atmSub = this.dataSvc
      .getATMs<ATMData>()
      .subscribe(data => (this.atmList = data));
    this.subscriptions.push(this.atmSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  toggle($event, atmID) {}
}
