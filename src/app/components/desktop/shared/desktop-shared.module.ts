import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterStepComponent} from './register-step/register-step.component';
import {UserAccountMenuComponent} from './user-account-menu/user-account-menu.component';
import {RouterModule} from '@angular/router';
import {TradePopupComponent} from './trade-popup/trade-popup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MarketPopupComponent} from './trade-popup/market-popup/market-popup.component';
import {LimitPopupComponent} from './trade-popup/limit-popup/limit-popup.component';
import {NgxMaskModule} from 'ngx-mask';
import {QaPopupComponent} from './qa-popup/qa-popup.component';
import {CommonSmallPopupComponent} from './common-small-popup/common-small-popup.component';
import {TermsAndConditionsPopupComponent} from './terms-and-conditions-popup/terms-and-conditions-popup.component';
import {FooterLinksComponent} from './footer-links/footer-links.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    RegisterStepComponent,
    UserAccountMenuComponent,
    TradePopupComponent,
    MarketPopupComponent,
    LimitPopupComponent,
    QaPopupComponent,
    CommonSmallPopupComponent,
    TermsAndConditionsPopupComponent,
    FooterLinksComponent,
  ],
  exports: [
    RegisterStepComponent,
    UserAccountMenuComponent,
    TradePopupComponent,
    MarketPopupComponent,
    QaPopupComponent,
    CommonSmallPopupComponent,
    TermsAndConditionsPopupComponent,
    FooterLinksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule,
    SharedModule,
  ]
})
export class DesktopSharedModule {
}
