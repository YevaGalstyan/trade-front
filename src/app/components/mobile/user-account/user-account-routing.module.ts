import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
import {UserAccountComponent} from './user-account.component';
import {UserAccountOverviewComponent} from './user-account-overview/user-account-overview.component';
import {UserProfileDataComponent} from './user-profile-data/user-profile-data.component';
import {UserTopUpComponent} from './user-top-up/user-top-up.component';
import {UserWithdrawalComponent} from './user-withdrawal/user-withdrawal.component';
import {UserAdvancePaymentComponent} from './user-advance-payment/user-advance-payment.component';
import {UserSupportComponent} from './user-support/user-support.component';
import {UserAccountOverviewDetailsComponent} from './user-account-overview/user-account-overview-details/user-account-overview-details.component';

// Guards
import {AuthGuard} from '../../../guards/auth.guard';
import {UserDocumentsComponent} from './user-documents/user-documents.component';

const routes: Routes = [
  {path: '', redirectTo: 'account-overview', pathMatch: 'full'},

  {
    path: '',
    component: UserAccountComponent,
    children: [
      {
        path: 'account-overview',
        component: UserAccountOverviewComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: ':id',
            component: UserAccountOverviewDetailsComponent,
          },
        ]
      },


      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: UserProfileDataComponent,
      },

      {
        path: 'top-up',
        canActivate: [AuthGuard],
        component: UserTopUpComponent,
      },

      {
        path: 'withdrawal',
        canActivate: [AuthGuard],
        component: UserWithdrawalComponent,
      },

      {
        path: 'advance-payment',
        canActivate: [AuthGuard],
        component: UserAdvancePaymentComponent,
      },

      {
        path: 'documents',
        canActivate: [AuthGuard],
        component: UserDocumentsComponent,
      },

      {
        path: 'support',
        canActivate: [AuthGuard],
        component: UserSupportComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {
}
