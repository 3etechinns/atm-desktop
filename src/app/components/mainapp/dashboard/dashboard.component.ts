import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { DataList, ATMData, ManagerData } from '../../../app.models';
import { BaseComponent } from '../../base/BaseComponent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  private atmPoll: Subscription;
  private managerPoll: Subscription;

  atmData: DataList<ATMData>;
  managerData: DataList<ManagerData>;

  constructor(private dataSvc: DataService) {
    super();
  }

  ngOnInit() {
    this.init();

    this.atmPoll = this.dataSvc
      .getATMs<DataList<ATMData>>()
      .subscribe(data => (this.atmData = data));

    this.managerPoll = this.dataSvc
      .getManagers<DataList<ManagerData>>()
      .subscribe(data => (this.managerData = data));

    this.getSubscriptions().push(this.atmPoll);
    this.getSubscriptions().push(this.managerPoll);
  }

  init() {
    $('#myBox').css(
      'max-height',
      $(window).height() - $('.main-header').height() - 140
    );

    $(window).resize(function() {
      jQuery('#myBox').css(
        'max-height',
        $(window).height() - $('.main-header').height() - 140
      );
    });
  }

  toggle($event, $id) {}
}
