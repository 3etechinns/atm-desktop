import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, forkJoin, Observable } from 'rxjs';
import { DialogComponent } from '../widgets/dialog/dialog.component';
import { UploaderService } from '../../providers/uploader.service';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { ElectronService } from '../../providers/electron.service';

export interface Item {
  name: string;
  fileName: string;
  downloadURL: string;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit, OnDestroy {
  @ViewChild('uploadDialog') uploadDialog: DialogComponent;
  @ViewChild('file') file;
  public addedFile: File;

  progress;
  primaryButtonText = 'Upload';
  uploading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  re = /\ /gi;

  private payrollCollections: AngularFirestoreCollection<Item>;
  payrolls: Observable<Item[]>;

  constructor(
    private uploaderSvc: UploaderService,
    private afs: AngularFirestore,
    private els: ElectronService
  ) {
    this.payrollCollections = afs.collection<Item>('Payrolls');
    this.payrolls = this.payrollCollections.valueChanges();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive: true
    };
  }

  ngOnDestroy() {
    this.uploadDialog.close();
  }

  public openUploadDialog() {
    this.uploadDialog.show({});
  }

  addFile() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    this.addedFile = this.file.nativeElement.files[0];
  }

  addFIle(_) {
    this.file.nativeElement.click();
  }

  upload(_) {
    const newFIleName = this.addedFile.name.replace(this.re, '_');
    const tasks = [];
    this.uploading = true;

    this.progress = this.uploaderSvc.upload(this.addedFile);

    tasks.push(this.progress.progress, this.progress.url);

    forkJoin(tasks).subscribe(res => {
      this.afs
        .collection('Payrolls')
        .doc(newFIleName)
        .set({
          name: this.addedFile.name,
          fileName: newFIleName,
          downloadURL: res[1]
        })
        .then(() => {
          this.addedFile = null;

          this.uploading = false;

          this.progress = null;
        })
        .catch(err => {});
    });
  }

  canShowUpload() {
    return this.uploading === false && this.addedFile !== null;
  }

  delete(itemId$) {
    this.uploaderSvc
      .delete(itemId$)
      .then(df => {
        return this.afs
          .collection('Payrolls')
          .doc(itemId$)
          .delete();
      })
      .then(() => console.log('Deleted successfully'))
      .catch(err => console.log(err));
  }

  download(url$) {
    this.els.shell.openExternal(url$);
  }
}
