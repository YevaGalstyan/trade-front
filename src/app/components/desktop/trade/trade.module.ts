import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TradeRoutingModule} from './trade-routing.module';
import {TradeComponent} from './trade.component';
import {TradePortfolioComponent} from './trade-portfolio/trade-portfolio.component';
import {TradeStocksComponent} from './trade-stocks/trade-stocks.component';
import {TradeTableComponent} from './trade-table/trade-table.component';
import {DesktopSharedModule} from '../shared/desktop-shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TradeHistoryComponent} from './trade-history/trade-history.component';
import {TradeOrderComponent} from './trade-order/trade-order.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    TradeComponent,
    TradePortfolioComponent,
    TradeStocksComponent,
    TradeTableComponent,
    TradeHistoryComponent,
    TradeOrderComponent,
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    DesktopSharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TradeModule {
}
