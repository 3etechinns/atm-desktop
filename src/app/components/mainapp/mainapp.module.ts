import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsModule } from '../widgets/widgets.module';
import { AuthService } from '../../providers/auth.service';
import { MyatmsComponent } from './myatms/myatms.component';
import { MessagingComponent } from './messaging/messaging.component';
import { SettingsComponent } from './settings/settings.component';
import { MainappComponent } from './mainapp.component';
import { InboxComponent } from './messaging/inbox/inbox.component';
import { SentComponent } from './messaging/sent/sent.component';
import { ComposeComponent } from './messaging/compose/compose.component';
import { AuthGuard } from '../../guards/auth.guard';

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
      { path: 'myatms', component: MyatmsComponent },
      {
        path: 'messaging',
        component: MessagingComponent,
        children: [
          {
            path: '',
            redirectTo: 'inbox',
            pathMatch: 'prefix'
          },
          { path: 'compose', component: ComposeComponent },
          { path: 'inbox', component: InboxComponent },
          { path: 'sent', component: SentComponent }
        ]
      },
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
    MessagingComponent,
    SettingsComponent,
    InboxComponent,
    SentComponent,
    ComposeComponent
  ],
  imports: [CommonModule, RouterModule.forChild(mainapproutes), WidgetsModule],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class MainappModule {}
