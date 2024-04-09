import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DesktopRoutingModule} from './desktop-routing.module';
import {DesktopComponent} from './desktop.component';
import {HeaderComponent} from './header/header.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DesktopSharedModule} from './shared/desktop-shared.module';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {CompanyDetailsComponent} from './header-menu/company-details/company-details.component';
import {AwardsDetailsComponent} from './header-menu/awards-details/awards-details.component';
import {ServiceDetailsComponent} from './header-menu/service-details/service-details.component';
import {IdeasDetailsComponent} from './header-menu/ideas-details/ideas-details.component';
import {ContactsDetailsComponent} from './header-menu/contacts-details/contacts-details.component';
import {IdeasPopupComponent} from './header-menu/ideas-details/ideas-popup/ideas-popup.component';
import {ContactsUsaDetailsComponent} from './header-menu/contacts-details/contacts-usa-details/contacts-usa-details.component';
import {ContactsChinaDetailsComponent} from './header-menu/contacts-details/contacts-china-details/contacts-china-details.component';
import {ContactsRussiaDetailsComponent} from './header-menu/contacts-details/contacts-russia-details/contacts-russia-details.component';
import {ContactsUnitedKingdomDetailsComponent} from './header-menu/contacts-details/contacts-united-kingdom-details/contacts-united-kingdom-details.component';
import {GeneralComponent} from './general/general.component';
import {MapComponent} from './general/map/map.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TradeViewWidgetComponent} from './trade-widget/trade-view-widget/trade-view-widget.component';
import {TradeApexWidgetComponent} from './trade-widget/trade-apex-widget/trade-apex-widget.component';
import {NgApexchartsModule} from 'ng-apexcharts';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    DesktopComponent,
    GeneralComponent,
    NotFoundComponent,
    MapComponent,
    HeaderComponent,
    LoginRegisterComponent,
    LoginComponent,
    CompanyDetailsComponent,
    AwardsDetailsComponent,
    ServiceDetailsComponent,
    IdeasDetailsComponent,
    ContactsDetailsComponent,
    IdeasPopupComponent,
    ContactsUsaDetailsComponent,
    ContactsChinaDetailsComponent,
    ContactsRussiaDetailsComponent,
    ContactsUnitedKingdomDetailsComponent,
    TradeViewWidgetComponent,
    TradeApexWidgetComponent,
  ],
  exports: [
    DesktopComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    DesktopRoutingModule,
    FormsModule,
    DesktopSharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    NgApexchartsModule
  ]
})
export class DesktopModule {
}
