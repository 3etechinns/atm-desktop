import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WidgetsModule } from './components/widgets/widgets.module';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    loadChildren: './components/mainapp/mainapp.module#MainappModule'
  }
];

@NgModule({
  imports: [
    WidgetsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
