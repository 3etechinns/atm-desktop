import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../providers/auth.service';
import { DataService } from '../../../providers/data.service';
import { map, flatMap } from 'rxjs/operators';
import { ATM } from '../../../data/atm';

@Component({
  selector: 'app-myatms',
  templateUrl: './myatms.component.html',
  styleUrls: ['./myatms.component.scss']
})
export class MyatmsComponent implements OnInit, OnDestroy {
  atmList: ATM[] = [];

  private atmSubscription: Subscription;

  constructor(private authSvc: AuthService, private dataSvc: DataService) {}

  ngOnInit() {
    this.atmSubscription = this.authSvc.authstate
      .pipe(
        flatMap(user => {
          return this.dataSvc.getMyATMs(user.uid);
        })
      )
      .subscribe(data => (this.atmList = data));
  }

  ngOnDestroy() {
    if (this.atmSubscription) {
      this.atmSubscription.unsubscribe();
    }
  }

  toggle($event, atmID) {}
}
