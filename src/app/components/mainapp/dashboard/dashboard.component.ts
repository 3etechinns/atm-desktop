import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Subscription, interval } from 'rxjs';
import { BaseComponent } from '../../base/BaseComponent';
import { BankService } from '@atmhotspot/bank';
import { startWith, switchMap } from 'rxjs/operators';
import {
  PaginatedData,
  ATMData,
  ManagerData
} from '@atmhotspot/bank/lib/bank.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  private atmPoll: Subscription;
  private managerPoll: Subscription;

  atmData: PaginatedData<ATMData>;
  managerData: PaginatedData<ManagerData>;

  constructor(private dataSvc: BankService) {
    super();
  }

  ngOnInit() {
    this.init();

    this.atmPoll = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.dataSvc.getATMs())
      )
      .subscribe(data => (this.atmData = data));

    this.managerPoll = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.dataSvc.getManagers())
      )
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
