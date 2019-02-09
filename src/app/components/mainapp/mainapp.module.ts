import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsModule } from '../widgets/widgets.module';
import { MyatmsComponent } from './myatms/myatms.component';
import { SettingsComponent } from './settings/settings.component';
import { MainappComponent } from './mainapp.component';

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
      { path: 'myatms',
        component: MyatmsComponent },
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
    SettingsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(mainapproutes), WidgetsModule],
  exports: [RouterModule]
})
export class MainappModule {}
