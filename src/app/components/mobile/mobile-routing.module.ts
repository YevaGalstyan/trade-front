import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Component
import {LoginRegisterGuard} from '../../guards/login-register.guard';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {LoginComponent} from './login/login.component';
import {GeneralComponent} from './general/general.component';
import {CompanyDetailsComponent} from './header-menu/company-details/company-details.component';
import {AwardsDetailsComponent} from './header-menu/awards-details/awards-details.component';
import {ServiceDetailsComponent} from './header-menu/service-details/service-details.component';
import {IdeasDetailsComponent} from './header-menu/ideas-details/ideas-details.component';
import {ContactsDetailsComponent} from './header-menu/contacts-details/contacts-details.component';
import {ContactsUsaDetailsComponent} from './header-menu/contacts-details/contacts-usa-details/contacts-usa-details.component';
import {ContactsChinaDetailsComponent} from './header-menu/contacts-details/contacts-china-details/contacts-china-details.component';
import {ContactsRussiaDetailsComponent} from './header-menu/contacts-details/contacts-russia-details/contacts-russia-details.component';
import {ContactsUnitedKingdomDetailsComponent} from './header-menu/contacts-details/contacts-united-kingdom-details/contacts-united-kingdom-details.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TradeGuard} from '../../guards/trade.guard';
import {TradeViewWidgetComponent} from './trade-widget/trade-view-widget/trade-view-widget.component';
import {TradeApexWidgetComponent} from './trade-widget/trade-apex-widget/trade-apex-widget.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'general'},

  {
    path: 'general',
    component: GeneralComponent
  },

  {
    path: 'welcome', canActivate: [LoginRegisterGuard],
    component: LoginRegisterComponent
  },

  {
    path: 'login', canActivate: [LoginRegisterGuard],
    component: LoginComponent
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },

  {
    path: 'company',
    component: CompanyDetailsComponent,
  },

  {
    path: 'awards',
    component: AwardsDetailsComponent,
  },

  {
    path: 'services',
    component: ServiceDetailsComponent,
  },

  {
    path: 'ideas',
    component: IdeasDetailsComponent,
  },

  {path: 'contact', pathMatch: 'full', redirectTo: 'contact/usa'},
  {
    path: 'contact',
    component: ContactsDetailsComponent,
    children: [
      {
        path: 'usa',
        component: ContactsUsaDetailsComponent,
      },
      {
        path: 'china',
        component: ContactsChinaDetailsComponent,
      },
      {
        path: 'russia',
        component: ContactsRussiaDetailsComponent,
      },
      {
        path: 'uk',
        component: ContactsUnitedKingdomDetailsComponent,
      }
    ]
  },

  // Graphics
  {
    path: 'graphic/type-1',
    component: TradeViewWidgetComponent,
  },
  {
    path: 'graphic/type-2',
    component: TradeApexWidgetComponent,
  },

  {
    path: 'account',
    loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule)
  },

  {
    path: 'trade',
    loadChildren: () => import('./trade/trade.module').then(m => m.TradeModule)
  },

  {path: '**', pathMatch: 'full', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule {
}
