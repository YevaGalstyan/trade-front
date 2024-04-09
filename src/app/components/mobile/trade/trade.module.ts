import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TradeRoutingModule} from './trade-routing.module';
import {TradeComponent} from './trade.component';
import {TradePortfolioComponent} from './trade-portfolio/trade-portfolio.component';
import {TradeStocksComponent} from './trade-stocks/trade-stocks.component';
import {TradeTableComponent} from './trade-table/trade-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TradeHistoryComponent} from './trade-history/trade-history.component';
import {TradeOrderComponent} from './trade-order/trade-order.component';
import {MobileSharedModule} from '../shared/mobile-shared.module';
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
        FormsModule,
        ReactiveFormsModule,
        MobileSharedModule,
        SharedModule,
    ]
})
export class TradeModule {
}
