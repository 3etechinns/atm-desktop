import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle: string;
  appWindow: Electron.BrowserWindow;

  constructor(
    public elSvc: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
  }

  ngOnInit(): void {
    this.appTitle = 'Smart ATM Management';
    this.setupResizer();

    if (this.elSvc.isElectron()) {
      this.appWindow = this.elSvc.getAppWindow();
    }
  }

  setupResizer() {
    $(window).resize(function() {
      const width = $(window).width();
      const hasClass = $('body').hasClass('sidebar-collapse');

      if (width <= 820) {
        if (hasClass !== true) {
          $('body').addClass('sidebar-collapse');
        }
      } else {
        if (hasClass === true) {
          $('body').removeClass('sidebar-collapse');
        }
      }
    });
  }
}
