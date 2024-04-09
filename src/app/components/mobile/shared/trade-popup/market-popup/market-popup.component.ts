import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {TradeService} from '../../../../../services/userServices/trade.service';

@Component({
  selector: 'app-market-popup',
  templateUrl: './market-popup.component.html',
  styleUrls: ['../trade-popup.component.scss']
})
export class MarketPopupComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public tradeService: TradeService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.tradeService.buyOrSellManualForm.controls
  }

}
