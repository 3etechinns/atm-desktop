import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YouthsComponent } from './components/youths/youths.component';
import { PayrollComponent } from './components/payroll/payroll.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PayrollComponent },
  { path: 'youths', component: YouthsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
