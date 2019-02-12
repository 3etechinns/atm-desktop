import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsModule } from '../widgets/widgets.module';
import { MyatmsComponent } from './myatms/myatms.component';
import { SettingsComponent } from './settings/settings.component';
import { MainappComponent } from './mainapp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ManagersComponent } from './managers/managers.component';

const mainapproutes: Routes = [
  {
    path: '',
    component: MainappComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'prefix'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: 'myatms', component: MyatmsComponent },
      { path: 'managers', component: ManagersComponent },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    MainappComponent,
    DashboardComponent,
    MyatmsComponent,
    SettingsComponent,
    ManagersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgSlimScrollModule,
    RouterModule.forChild(mainapproutes),
    WidgetsModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false
      }
    }
  ]
})
export class MainappModule {}
