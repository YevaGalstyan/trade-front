import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
import {TradeComponent} from './trade.component';
import {TradePortfolioComponent} from './trade-portfolio/trade-portfolio.component';
import {TradeStocksComponent} from './trade-stocks/trade-stocks.component';

// Guards
import {AuthGuard} from '../../../guards/auth.guard';
import {TradeGuard} from '../../../guards/trade.guard';
import {TradeHistoryComponent} from './trade-history/trade-history.component';
import {TradeOrderComponent} from './trade-order/trade-order.component';

const routes: Routes = [
  {path: '', redirectTo: 'stocks', pathMatch: 'full'},

  {
    path: '',
    component: TradeComponent,
    children: [
      {
        path: 'portfolio',
        component: TradePortfolioComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'stocks',
        component: TradeStocksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'history',
        component: TradeHistoryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order',
        component: TradeOrderComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule {
}
