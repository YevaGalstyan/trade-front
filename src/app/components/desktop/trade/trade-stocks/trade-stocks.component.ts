import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {TradeService} from '../../../../services/userServices/trade.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';
import {DesktopService} from '../../../../services/desktop.service';
import {LocalizeService} from '../../../../services/localize.service';

@Component({
  selector: 'app-trade-stocks',
  templateUrl: './trade-stocks.component.html',
})
export class TradeStocksComponent extends BaseComponent implements OnInit {

  tradeModalStatus: boolean;
  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public tradeService: TradeService,
              private desktopService: DesktopService) {
    super();
  }

  ngOnInit(): void {
    this.tradeService.lastTransactionCount = 5;
    this.tradeService.lastSearchCount = 5;
    if (this.tradeService.searchTermForm.value) {
      this.tradeService.searchFilter(this.tradeService.searchTermForm.value, this.tradeService.lastSearchCount)
    } else {
      this.tradeService.getMOEXStocksData(0, 5);
    }
    this.getTradeModalStatus();
    this.getCommonModalStatus();
  }

  private getTradeModalStatus() {
    this.tradeService.tradeModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.tradeModalStatus = updatedStatus;
    });
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }


}
