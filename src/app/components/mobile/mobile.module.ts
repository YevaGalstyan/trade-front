import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MobileRoutingModule} from './mobile-routing.module';
import {MobileComponent} from './mobile.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GeneralComponent} from './general/general.component';
import {MapComponent} from './general/map/map.component';
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
import {MobileSharedModule} from './shared/mobile-shared.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {TradeViewWidgetComponent} from './trade-widget/trade-view-widget/trade-view-widget.component';
import {TradeApexWidgetComponent} from './trade-widget/trade-apex-widget/trade-apex-widget.component';
import {NgApexchartsModule} from 'ng-apexcharts';


@NgModule({
  declarations: [
    MobileComponent,
    SideBarComponent,
    LoginRegisterComponent,
    LoginComponent,
    GeneralComponent,
    MapComponent,
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
    NotFoundComponent,
    TradeViewWidgetComponent,
    TradeApexWidgetComponent
  ],
  exports: [
    MobileComponent
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    ReactiveFormsModule,
    MobileSharedModule,
    NgApexchartsModule,
  ]
})
export class MobileModule {
}
