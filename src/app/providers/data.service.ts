import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Bank } from '../data/bank';
import { map } from 'rxjs/operators';
import { ATM } from '../data/atm';
import { Report } from '../data/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private atmRef = 'ATMS';
  private reportRef = 'Reports';

  constructor(private database: AngularFireDatabase) {}

  getUserData(userID: string = '') {
    return this.database
      .object<Bank>('Banks/' + userID)
      .snapshotChanges();
  }

  getMyATMs(userID: string = '') {
    return this.database
      .list<ATM>(this.atmRef, ref =>
        ref.orderByChild('bank_id').equalTo(userID)
      )
      .snapshotChanges()
      .pipe(
        map(datalist => {
          const atmsList: ATM[] = [];
          datalist.forEach(data => {
            const atm: ATM = data.payload.val();
            atm.atm_id = data.payload.key;
            atmsList.push(atm);
          });
          return atmsList;
        })
      );
  }

  getMyReports(userID: string = '') {
    return this.database
      .list<Report>(this.reportRef, ref =>
        ref.orderByChild('bankID').equalTo(userID)
      )
      .snapshotChanges()
      .pipe(
        map(datalist => {
          const atmsList: Report[] = [];
          datalist.forEach(data => {
            const report: Report = data.payload.val();
            report.id = data.payload.key;
            atmsList.push(report);
          });
          return atmsList;
        })
      );
  }
}
