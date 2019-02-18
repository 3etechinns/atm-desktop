import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { interval, Observable } from 'rxjs';
import { BankService } from '@keyz/ng-atmhotspot-bank';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import {
  ATMData,
  ManagerData,
  PaginatedData,
  BranchData
} from '@keyz/ng-atmhotspot-bank/lib/bank.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  atmSub: Observable<PaginatedData<ATMData>>;
  managerSub: Observable<PaginatedData<ManagerData>>;
  branchSub: Observable<PaginatedData<BranchData>>;

  constructor(private dataSvc: BankService) {}

  ngOnInit() {
    this.init();

    this.atmSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getATMs()),
      distinctUntilChanged()
    );

    this.managerSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getManagers()),
      distinctUntilChanged()
    );

    this.branchSub = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getBranches()),
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
