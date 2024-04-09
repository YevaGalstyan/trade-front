import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Modules
import {UserAccountRoutingModule} from './user-account-routing.module';
import {MobileSharedModule} from '../shared/mobile-shared.module';

// Component
import {UserAccountComponent} from './user-account.component';
import {UserAccountOverviewComponent} from './user-account-overview/user-account-overview.component';
import {UserProfileDataComponent} from './user-profile-data/user-profile-data.component';
import {UserTopUpComponent} from './user-top-up/user-top-up.component';
import {UserAdvancePaymentComponent} from './user-advance-payment/user-advance-payment.component';
import {UserSupportComponent} from './user-support/user-support.component';
import {UserWithdrawalComponent} from './user-withdrawal/user-withdrawal.component';
import {UserAccountOverviewDetailsComponent} from './user-account-overview/user-account-overview-details/user-account-overview-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HistoryTableComponent} from './user-account-overview/history-table/history-table.component';
import {TopUpDataComponent} from './user-top-up/top-up-data/top-up-data.component';
import {ClipboardModule} from 'ngx-clipboard';
import {NgxMaskModule} from 'ngx-mask';
import {UserDocumentsComponent} from './user-documents/user-documents.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserAccountComponent,
    UserAccountOverviewComponent,
    UserProfileDataComponent,
    UserTopUpComponent,
    UserAdvancePaymentComponent,
    UserSupportComponent,
    UserWithdrawalComponent,
    UserAccountOverviewDetailsComponent,
    HistoryTableComponent,
    TopUpDataComponent,
    UserDocumentsComponent
  ],
    imports: [
        CommonModule,
        UserAccountRoutingModule,
        ReactiveFormsModule,
        ClipboardModule,
        NgxMaskModule,
        MobileSharedModule,
        SharedModule
    ]
})
export class UserAccountModule {
}
