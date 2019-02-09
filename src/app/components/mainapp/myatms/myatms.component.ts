import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { ATMData, DataList } from '../../../app.models';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../../base/BaseComponent';

@Component({
  selector: 'app-myatms',
  templateUrl: './myatms.component.html',
  styleUrls: ['./myatms.component.scss']
})
export class MyatmsComponent extends BaseComponent implements OnInit {
  atmData: DataList<ATMData>;

  atmSub: Subscription;

  canshowFull = true;
  canshowAdd = false;
  selectedATM: ATMData = null;

  constructor(private dataSvc: DataService) {
    super();
  }

  ngOnInit() {
    this.atmSub = this.dataSvc
      .getATMs<DataList<ATMData>>()
      .subscribe(data => (this.atmData = data));
    this.getSubscriptions().push(this.atmSub);
  }

  toggle($event, atmID) {}

  showATMDetails($atm: ATMData) {
    this.canshowFull = false;
    setTimeout(() => {
      this.selectedATM = $atm;
    }, 30);
  }

  showAddNew() {
    
  }
}
