import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { NonAuthGuard } from '../../guards/non-auth.guard';

const mainauthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivateChild: [NonAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'prefix'
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'forgetpassword',
        component: ForgetpassComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ForgetpassComponent,
    AuthComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(mainauthRoutes)],
  exports: [RouterModule]
})
export class AuthModule {}
