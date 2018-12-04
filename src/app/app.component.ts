import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ourApp;

  constructor(
    public elSvc: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (elSvc.isElectron()) {
      this.ourApp = elSvc.getAppWindow();
      console.log('Electron ipcRenderer', elSvc.ipcRenderer);
      console.log('NodeJS childProcess', elSvc.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {}
}
