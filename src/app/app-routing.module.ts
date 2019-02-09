import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WidgetsModule } from './components/widgets/widgets.module';
import {AuthGuard} from './guards/auth.guard';
import {NonAuthGuard} from './guards/non-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule',
    canActivate: [NonAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './components/mainapp/mainapp.module#MainappModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    WidgetsModule,
    RouterModule.forRoot(routes, {
      useHash: true
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthGuard]
})
export class AppRoutingModule {}
