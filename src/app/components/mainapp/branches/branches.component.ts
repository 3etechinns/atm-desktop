import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BranchData,
  PaginatedData
} from '@keyz/ng-atmhotspot-bank/lib/bank.models';
import { Subject } from 'rxjs';
import { startWith, distinctUntilChanged, map, flatMap } from 'rxjs/operators';
import { BankService } from '@keyz/ng-atmhotspot-bank';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  @ViewChild('addSwal') private addSwal: SwalComponent;
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('updateSwal') private updateSwal: SwalComponent;

  branchData: PaginatedData<BranchData>;

  pageNumber = new Subject<number>();

  name = '';
  city = '';
  town = '';

  selectedBranch: BranchData = null;

  public alertOption1: SweetAlertOptions = {};
  public alertOption2: SweetAlertOptions = {};
  public alertOption3: SweetAlertOptions = {};

  constructor(private dataSvc: BankService) {
    this.alertOption1 = {
      preConfirm: () => {
        return this.dataSvc
          .addBranch({
            name: this.name,
            city: this.city,
            town: this.town
          })
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };
    this.alertOption2 = {
      preConfirm: () => {
        return this.dataSvc
          .deleteBranch(this.selectedBranch.id.toString())
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };
    this.alertOption3 = {
      preConfirm: () => {
        return this.dataSvc
          .updateBranch(this.selectedBranch.id.toString(), {
            name: this.name,
            city: this.city,
            town: this.town
          })
          .toPromise();
      },
      allowOutsideClick: () => !swal.isLoading()
    };
  }

  ngOnInit() {
    this.pageNumber
      .pipe(
        startWith(
          localStorage['branchPageStore'] === undefined
            ? 1
            : localStorage['branchPageStore']
        ),
        distinctUntilChanged(),
        map((page: number) => {
          localStorage['branchPageStore'] = page;
          return this.dataSvc.getBranches({ paginate: 5, page });
        }),
        flatMap(res => res)
      )
      .subscribe(data => (this.branchData = data));
  }

  showAddDialog() {
    this.addSwal
      .show()
      .then(res => {
        if (res.value !== undefined && res.value.data !== undefined) {
          swal({
            type: 'success',
            title: 'Wow, that was great',
            text: 'Branch has been successfully added'
          });
        }
      })
      .catch(err => console.log(err));
  }

  updateBranch() {
    this.name = this.selectedBranch.name;
    this.city = this.selectedBranch.city;
    this.town = this.selectedBranch.town;
    this.updateSwal
      .show()
      .then(suc => console.log(suc))
      .catch(err => console.log(err));
  }

  deleteBranch() {
    this.deleteSwal
      .show()
      .then(() => {
        swal({
          type: 'success',
          title: 'Wow, that was great',
          text: 'Branch has been successfully deleted'
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
