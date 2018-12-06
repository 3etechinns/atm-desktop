import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnnouncementsComponent} from './components/announcements/announcements.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NoticeboardComponent} from './components/noticeboard/noticeboard.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'sendnotification/:userType', component: NotificationComponent},
  { path: 'calender', component: NoticeboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
