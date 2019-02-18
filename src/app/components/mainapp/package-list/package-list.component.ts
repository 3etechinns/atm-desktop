import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BankBillingService } from '@keyz/ng-atmhotspot-bank';
import { Observable, interval } from 'rxjs';
import { PlanData } from '@keyz/ng-atmhotspot-bank/lib/bank.models';
import {
  startWith,
  switchMap,
  distinctUntilChanged,
  map,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  @Output() packageClick = new EventEmitter<PlanData>();

  packagesSub: Observable<PlanData[]>;

  constructor(private billingSvc: BankBillingService) {}

  ngOnInit() {
    this.packagesSub = interval(100000).pipe(
      startWith(0),
      switchMap(() => this.billingSvc.getPlans()),
      tap(data =>
        data.data.forEach(data => {
          data.amount = data.amount / 100;
        })
      ),
      map(res =>
        res.data.sort((a, b) => {
          return a.amount > b.amount ? 1 : 0;
        })
      ),
      distinctUntilChanged()
    );
  }

  click($event: PlanData) {
    this.packageClick.emit($event);
  }
}
