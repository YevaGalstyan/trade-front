import {Component, Input, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {TradeService} from '../../../../services/userServices/trade.service';
import {commonEnum} from '../../../../shared/commonEnum'

@Component({
  selector: 'app-trade-table',
  templateUrl: './trade-table.component.html',
})
export class TradeTableComponent implements OnInit {

  @Input() displayedData: any;
  @Input() forStock: boolean;

  constructor(public localize: LocalizeService,
              public tradeService: TradeService,
              public commonEnum: commonEnum) {
  }

  ngOnInit(): void {
  }

  addPaginationTransaction(): void {
    this.tradeService.lastTransactionCount += 5;
    this.tradeService.lastSearchCount += 5;
    if (this.tradeService.searchValue) {
      this.tradeService.searchFilter(this.tradeService.searchValue, this.tradeService.lastSearchCount)
    } else {
      this.tradeService.getMOEXStocksData(0, this.tradeService.lastTransactionCount)
    }
  }

}
