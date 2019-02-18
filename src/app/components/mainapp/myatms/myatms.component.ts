import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { Ng2IzitoastService } from 'ng2-izitoast';
import * as $ from 'jquery';
import { BankService } from '@keyz/ng-atmhotspot-bank';
import {
  ATMData,
  PaginatedData
} from '@keyz/ng-atmhotspot-bank/lib/bank.models';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { flatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-myatms',
  templateUrl: './myatms.component.html',
  styleUrls: ['./myatms.component.scss']
})
export class MyatmsComponent implements OnInit {
  @Input() showHeader = true;
  alertOption1: SweetAlertOptions = {};
  alertOption2: SweetAlertOptions = {};
  alertOption3: SweetAlertOptions = {};

  atmData: PaginatedData<ATMData>;

  pageUrl = new Subject<string>();

  isAddLoading = false;
  selectedATM: ATMData = null;
  atmName = '';
  atmlocation = '';
  atmLat = 0;
  atmLng = 0;
  atmStatus = 'Online';
  @ViewChild('addSwal') private addSwal: SwalComponent;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('updateSwal') private updateSwal: SwalComponent;

  constructor(
    private dataSvc: BankService,
    private iziToast: Ng2IzitoastService
  ) {
    this.alertOption1 = {
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          if (this.validate()) {
            this.isAddLoading = true;
            return resolve(
              this.dataSvc
                .addATM({
                  name: this.atmName,
                  city: this.atmlocation,
                  lat: this.atmLat,
                  lng: this.atmLng,
                  status: this.getStatus()
                })
                .toPromise()
            );
          } else {
            return reject(
              new Error('There was an error validating data. Check & Try again')
            );
          }
        });
      },
      allowOutsideClick: () => !swal.isLoading()
    };

    this.alertOption2 = {
      preConfirm: () => {
        return this.dataSvc
          .deleteATM(this.selectedATM.id.toString())
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };

    this.alertOption3 = {
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          if (this.validate()) {
            return resolve(
              this.dataSvc
                .updateATM(this.selectedATM.id.toString(), {
                  name: this.atmName,
                  city: this.atmlocation,
                  lat: this.atmLat,
                  lng: this.atmLng,
                  status: this.getStatus()
                })
                .toPromise()
            );
          } else {
            return reject(
              new Error('There was an error validating data. Check & Try again')
            );
          }
        });
      },
      allowOutsideClick: () => !swal.isLoading()
    };
  }

  ngOnInit() {
    this.pageUrl
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        map(page => {
          return page.trim().length === 0
            ? this.dataSvc.getATMs()
            : this.dataSvc.getATMs(page);
        }),
        flatMap(res => res)
      )
      .subscribe(data => (this.atmData = data));
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

  validate(): boolean {
    if (this.atmName.trim().length === 0) {
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
          "ATM Name shouldn't contain words like <b>Bank</b> or <b>International</b>. Check & Try again",
        position: 'bottomRight',
        transitionIn: 'bounceInLeft'
      });
      return false;
    }
    if (this.atmlocation.trim().length === 0) {
      return false;
    }
    return true;
  }

  getStatus(): number {
    switch (this.atmStatus.trim()) {
      case 'Online':
        return 1;
      case 'Offline':
        return 0;
      case 'Out Of Cash':
        return -1;
    }
  }

  getStatusFromString(num: number): string {
    switch (num) {
      case 0:
        return 'Offline';
      case 1:
        return 'Online';
      case -1:
        return 'Out Of Cash';
    }
  }

  showSwal(): void {
    this.addSwal
      .show()
      .then(res => {
        this.isAddLoading = false;
        if (res.value !== undefined && res.value.data !== undefined) {
          swal({
            type: 'success',
            title: 'Wow, that was great',
            text: 'ATM has been successfully added'
          });
        }
      })
      .catch(err => {
        this.isAddLoading = false;
        swal({
          type: 'error',
          title: 'Oops !',
          text: err.message
        });
      });
  }

  toggle($event: boolean, $id): void {
    this.dataSvc.updateATM($id, { status: $event ? 1 : 0 }).toPromise();
  }

  deleteATM(): void {
    this.deleteSwal
      .show()
      .then(() => {
        swal({
          type: 'success',
          title: 'Wow, that was great',
          text: 'ATM has been successfully added'
        });
      })
      .catch(err => {
        swal({
          type: 'success',
          title: 'Wow, that was great',
          text: 'ATM has been successfully added'
        });
      });
  }

  updateATM(): void {
    this.atmName = this.selectedATM.name;
    this.atmlocation = this.selectedATM.city;
    this.atmStatus = this.getStatusFromString(this.selectedATM.status);
    this.atmLat = this.selectedATM.coordinate.lat;
    this.atmLng = this.selectedATM.coordinate.lng;

    this.updateSwal
      .show()
      .then(res => {
        this.atmName = '';
        this.atmlocation = '';
        this.atmStatus = 'Online';
        this.atmLat = 0;
        this.atmLng = 0;
        if (res.value !== undefined && res.value.data !== undefined) {
          swal({
            type: 'success',
            title: 'Wow, that was great',
            text: 'ATM has been successfully added'
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.atmName = '';
        this.atmlocation = '';
        this.atmStatus = 'Online';
        this.atmLat = 0;
        this.atmLng = 0;
        swal({
          type: 'error',
          title: 'Oops !',
          text: err.message
        });
      });
  }
}
