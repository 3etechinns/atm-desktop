import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import {
  PaginatedData,
  ManagerData,
  BranchData
} from '@codekeyz/ng-atmbank';
import { BankService } from '@codekeyz/ng-atmbank';
import { startWith, distinctUntilChanged, map, flatMap } from 'rxjs/operators';
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

  managerData: PaginatedData<ManagerData>;
  selectedManager: ManagerData = null;
  branchData: BranchData[];

  selectedBranch: number;

  username = '';
  email: '';
  password = '';

  pageNumber = new Subject<number>();

  public alertOption1: SweetAlertOptions = {};
  public alertOption2: SweetAlertOptions = {};

  constructor(private dataSvc: BankService) {
    this.alertOption1 = {
      preConfirm: () => {
        return this.dataSvc
          .addManager({
            name: this.username,
            email: this.email,
            password: 'Codemonster123',
            branch_id: this.selectedBranch
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
    this.dataSvc
      .getBranches()
      .pipe(map(res => res.data))
      .subscribe(res => (this.branchData = res));

    this.pageNumber
      .pipe(
        startWith(
          localStorage['managerPageStore'] === undefined
            ? 1
            : localStorage['managerPageStore']
        ),
        distinctUntilChanged(),
        map((page: number) => {
          localStorage['managerPageStore'] = page;
          return this.dataSvc.getManagers({ paginate: 5, page });
        }),
        flatMap(res => res)
      )
      .subscribe(data => (this.managerData = data));
  }

  showAddDialog(): void {
    this.addSwal
      .show()
      .then(res => {
        if (res.value !== undefined && res.value.data !== undefined) {
          swal({
            type: 'success',
            title: 'Wow, that was great',
            text: 'Manager has been successfully added'
          });
        }
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
          title: 'Oops ! An Error Occurred',
          text: err.error.errorMessage
        });
      });
  }

  next(page: number) {
    this.pageNumber.next(page);
  }
}
