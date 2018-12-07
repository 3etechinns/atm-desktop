import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EditorModule } from '@tinymce/tinymce-angular';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/widgets/titlebar/titlebar.component';
import { SidebarComponent } from './components/widgets/sidebar/sidebar.component';
import { ContentHeaderComponent } from './components/widgets/content-header/content-header.component';
import { InfoboxComponent } from './components/widgets/infobox/infobox.component';
import { YouthsComponent } from './components/youths/youths.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { AppConfig } from '../environments/environment.prod';
import { ProgressComponent } from './components/widgets/progress/progress.component';
import { DialogComponent } from './components/widgets/dialog/dialog.component';
import * as bootstrap from 'bootstrap';
import { UploaderService } from './providers/uploader.service';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { NotificationComponent } from './components/notification/notification.component';
import {NoticeboardComponent} from './components/noticeboard/noticeboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    TitlebarComponent,
    SidebarComponent,
    ContentHeaderComponent,
    InfoboxComponent,
    YouthsComponent,
    PayrollComponent,
    ProgressComponent,
    DialogComponent,
    AnnouncementsComponent,
    NotificationComponent,
    NoticeboardComponent,
    DashboardComponent],
  imports: [
    BrowserModule,
    EditorModule,
    AngularFireModule.initializeApp(AppConfig.firebase),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, UploaderService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
