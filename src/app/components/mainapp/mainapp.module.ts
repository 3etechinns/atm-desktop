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
import { AuthGuard } from '../../guards/auth.guard';
import { BillingComponent } from './billing/billing.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PackageListComponent } from './package-list/package-list.component';
import { BranchesComponent } from './branches/branches.component';

const mainapproutes: Routes = [
  {
    path: '',
    component: MainappComponent,
    canActivateChild: [AuthGuard],
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
      { path: 'branches', component: BranchesComponent},
      { path: 'myatms', component: MyatmsComponent },
      { path: 'managers', component: ManagersComponent },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'billing',
        component: BillingComponent
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
    ManagersComponent,
    BillingComponent,
    PackageListComponent,
    BranchesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgSlimScrollModule,
    NgxStripeModule.forRoot('pk_test_qCMHKLE6spBRdqDqdC48sEHS'),
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
