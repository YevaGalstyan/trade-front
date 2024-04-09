import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QaPopupComponent} from './qa-popup/qa-popup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonSmallPopupComponent} from './common-small-popup/common-small-popup.component';
import {RegisterStepComponent} from './register-step/register-step.component';
import {UserAccountMenuComponent} from './user-account-menu/user-account-menu.component';
import {TradePopupComponent} from './trade-popup/trade-popup.component';
import {TermsAndConditionsPopupComponent} from './terms-and-conditions-popup/terms-and-conditions-popup.component';
import {RouterModule} from '@angular/router';
import {LimitPopupComponent} from './trade-popup/limit-popup/limit-popup.component';
import {MarketPopupComponent} from './trade-popup/market-popup/market-popup.component';
import {FooterLinksComponent} from './footer-links/footer-links.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [
        QaPopupComponent,
        CommonSmallPopupComponent,
        RegisterStepComponent,
        UserAccountMenuComponent,
        TermsAndConditionsPopupComponent,
        TradePopupComponent,
        LimitPopupComponent,
        MarketPopupComponent,
        FooterLinksComponent,
    ],
    exports: [
        QaPopupComponent,
        CommonSmallPopupComponent,
        RegisterStepComponent,
        TermsAndConditionsPopupComponent,
        UserAccountMenuComponent,
        TradePopupComponent,
        LimitPopupComponent,
        MarketPopupComponent,
        FooterLinksComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class MobileSharedModule {
}
