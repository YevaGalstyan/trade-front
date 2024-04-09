import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
import {RegisterFirstComponent} from './register-first/register-first.component';
import {RegisterFirstAdditionalComponent} from './register-first-additional/register-first-additional.component';
import {RegisterSecondComponent} from './register-second/register-second.component';
import {RegisterThirdComponent} from './register-third/register-third.component';
import {RegisterForthComponent} from './register-forth/register-forth.component';
import {RegisterComponent} from './register.component';
import {RegisterFifthComponent} from './register-fifth/register-fifth.component';

//Guards
import {RegisterFirstStepAddGuard} from '../../../guards/register-first-step-add.guard';
import {RegisterSecondStepGuard} from '../../../guards/register-second-step.guard';
import {RegisterThirdStepGuardGuard} from '../../../guards/register-third-step-guard.guard';
import {RegisterForthStepGuardGuard} from '../../../guards/register-forth-step-guard.guard';
import {RegisterFifthStepGuardGuard} from '../../../guards/register-fifth-step-guard.guard';
import {LoginRegisterGuard} from '../../../guards/login-register.guard';

const routes: Routes = [
  {path: '', redirectTo: 'step-1', pathMatch: 'full'},

  {
    path: '',
    component: RegisterComponent,
    children: [
      {
        path: 'step-1',
        canActivate: [LoginRegisterGuard],
        component: RegisterFirstComponent,
      },

      {
        path: 'step-1-add',
        canActivate: [LoginRegisterGuard, RegisterFirstStepAddGuard],
        component: RegisterFirstAdditionalComponent,
      },

      {
        path: 'step-2',
        canActivate: [LoginRegisterGuard, RegisterSecondStepGuard],
        component: RegisterSecondComponent,
      },

      {
        path: 'step-3',
        canActivate: [LoginRegisterGuard, RegisterThirdStepGuardGuard],
        component: RegisterThirdComponent,
      },

      {
        path: 'step-4',
        canActivate: [LoginRegisterGuard, RegisterForthStepGuardGuard],
        component: RegisterForthComponent,
      },

      {
        path: 'step-5',
        canActivate: [LoginRegisterGuard, RegisterFifthStepGuardGuard],
        component: RegisterFifthComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
