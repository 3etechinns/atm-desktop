import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { interval, Observable } from 'rxjs';
import { BankService } from '@codekeyz/ng-atmbank';
import {
  distinctUntilChanged,
  startWith,
  switchMap,
  map
} from 'rxjs/operators';
import {
  ATMData,
  ManagerData,
  PaginatedData,
  BranchData
} from '@codekeyz/ng-atmbank/lib/bank.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  atmSub: Observable<ATMData[]>;
  managerSub: Observable<ManagerData[]>;
  branchSub: Observable<BranchData[]>;

  constructor(private dataSvc: BankService) {}

  ngOnInit() {
    this.init();

    this.atmSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getATMs()),
      map(res => res.data),
      distinctUntilChanged()
    );

    this.managerSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getManagers()),
      map(res => res.data),
      distinctUntilChanged()
    );

    this.branchSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getBranches()),
      map(res => res.data),
      distinctUntilChanged()
    );
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
}
