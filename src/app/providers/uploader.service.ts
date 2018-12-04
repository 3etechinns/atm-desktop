import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UploaderService {
  constructor(
    private afStorage: AngularFireStorage,
    private afDatabase: AngularFirestore
  ) {}

  public upload(file: File) {
    // this will be the our resulting map
    let status = {};

    const re = /\ /gi;

    const newName = file.name.replace(re, '_');

    const ref = this.afStorage.ref(newName);
    const task = ref.put(file);
    const progress = task.percentageChanges();
    const downloadURL = ref.getDownloadURL();

    // Save every progress-observable in a map of all observables
    status = {
      progress: progress,
      url: downloadURL
    };

    return status;
  }

  public delete($filename) {
    return this.afStorage
      .ref($filename)
      .delete()
      .toPromise();
  }
}
