import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { ATMData, DataList, Data } from '../../../app.models';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../../base/BaseComponent';
import { Ng2IzitoastService } from 'ng2-izitoast';
import * as $ from 'jquery';

@Component({
  selector: 'app-myatms',
  templateUrl: './myatms.component.html',
  styleUrls: ['./myatms.component.scss']
})
export class MyatmsComponent extends BaseComponent implements OnInit {
  @Input() showHeader = true;

  atmData: DataList<ATMData>;

  atmSub: Subscription;

  canshowFull = true;
  canshowAdd = false;
  isAddLoading = false;

  selectedATM: ATMData = null;

  atmName = '';
  atmlocation = '';
  atmLat = 0;
  atmLng = 0;
  atmStatus = 'Online';

  constructor(
    private dataSvc: DataService,
    private iziToast: Ng2IzitoastService
  ) {
    super();
  }

  ngOnInit() {
    this.atmSub = this.dataSvc.getATMs<DataList<ATMData>>().subscribe(data => {
      this.atmData = data;
    });
    this.getSubscriptions().push(this.atmSub);

    this.setupHeight();
  }

  setupHeight() {
    $(window).resize(() => {
      // min content-wrapper height = 520;
      const minHeight = $('div.content-wrapper').height();
      if (minHeight <= 520) {
        $('div.box-body').css('max-height', 330);
      }
    });
  }

  toggle($event, atmID) {}

  showATMDetails($atm: ATMData) {
    this.canshowFull = false;
    this.canshowAdd = false;
    setTimeout(() => {
      this.selectedATM = $atm;
    }, 30);
  }

  showAddNew() {
    this.canshowAdd = true;
    this.canshowFull = false;
  }

  addNewATM() {
    if (!this.validate()) {
      return;
    }

    this.dataSvc
      .addATM<Data<ATMData>>({
        name: this.atmName,
        city: this.atmlocation,
        lat: this.atmLat,
        lng: this.atmLng,
        status: this.getStatus()
      })
      .subscribe(
        () => {
          this.canshowFull = true;
          this.iziToast.success({
            id: 'success',
            title: 'Success',
            message: 'ATM was added successfully.',
            position: 'bottomRight',
            transitionIn: 'bounceInLeft'
          });
        },
        err => {
          this.iziToast.error({
            id: 'error',
            title: 'Error',
            message: err.error,
            position: 'bottomRight',
            transitionIn: 'bounceInLeft'
          });
        }
      );
  }

  validate(): boolean {
    if (this.atmName.trim().length === 0) {
      this.iziToast.error({
        id: 'error',
        title: 'Error',
        message: 'ATM Name is required. Check & Try again',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return false;
    }
    if (
      this.atmName.includes('Bank') ||
      this.atmName.includes('International')
    ) {
      this.iziToast.error({
        id: 'error',
        title: 'Error',
        message:
          'ATM Name shouldn\'t contain words like <b>Bank</b> or <b>International</b>. Check & Try again',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return false;
    }
    if (this.atmlocation.trim().length === 0) {
      this.iziToast.error({
        id: 'error',
        title: 'Error',
        message: 'ATM Location is required. Check & Try again',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return false;
    }
    return true;
  }

  getStatus(): number {
    switch (this.atmStatus) {
      case 'Online':
        return 1;
      case 'Offline':
        return 0;
      case 'Out of Cash':
        return -1;
    }
  }
}
