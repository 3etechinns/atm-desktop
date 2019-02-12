import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { PaginatedData, ManagerData } from '@atmhotspot/bank/lib/bank.models';
import { BankService } from '@atmhotspot/bank';
import { startWith, switchMap } from 'rxjs/operators';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
  @ViewChild('addSwal') private addSwal: SwalComponent;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  managerObservable: Observable<PaginatedData<ManagerData>>;
  selectedManager: ManagerData = null;

  username = '';
  email: '';
  password = '';

  public alertOption1: SweetAlertOptions = {};
  public alertOption2: SweetAlertOptions = {};

  constructor(private dataSvc: BankService) {
    this.alertOption1 = {
      preConfirm: () => {
        return this.dataSvc
          .addManager({
            name: this.username,
            email: this.email,
            password: 'Codemonster123'
          })
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };

    this.alertOption2 = {
      preConfirm: () => {
        return this.dataSvc
          .deleteManager(this.selectedManager.id.toString())
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };
  }

  ngOnInit() {
    this.managerObservable = interval(10000).pipe(
      startWith(0),
      switchMap(() => this.dataSvc.getManagers())
    );
  }

  showAddDialog(): void {
    this.addSwal
      .show()
      .then(() => {
        swal({
          type: 'success',
          title: 'Wow, that was great',
          text: 'Manager has been successfully added'
        });
      })
      .catch(err => {
        console.log(err);
        swal({
          type: 'error',
          title: 'Oops !',
          text: err.message
        });
      });
  }

  deleteManager(): void {
    this.deleteSwal
      .show()
      .then(() => {
        swal({
          type: 'success',
          title: 'Wow, that was great',
          text: 'Manager has been successfully deleted'
        });
      })
      .catch(err => {
        swal({
          type: 'error',
          title: 'Oops !',
          text: err.message
        });
      });
  }
}
