import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {TradeService} from '../../../../services/userServices/trade.service';
import {commonEnum} from '../../../../shared/commonEnum'

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
})
export class TradeHistoryComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public tradeService: TradeService,
              public commonEnum: commonEnum) {
    this.tradeService.lastTransactionCount = 5;
    this.tradeService.getMyTradings(true,0, 5);
  }

  ngOnInit(): void {
  }

  addPaginationTransaction(): void {
    this.tradeService.lastTransactionCount += 5;
    this.tradeService.getMyTradings(true, 0, this.tradeService.lastTransactionCount);
  }

}
