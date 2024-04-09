import {Component, OnInit} from '@angular/core';
import {TradeService} from '../../../../../services/userServices/trade.service';
import {LocalizeService} from '../../../../../services/localize.service';

@Component({
    selector: 'app-limit-popup',
    templateUrl: './limit-popup.component.html',
    styleUrls: ['../trade-popup.component.scss']
})
export class LimitPopupComponent implements OnInit {

    constructor(public tradeService: TradeService,
                public localize: LocalizeService) {
    }

    ngOnInit(): void {
      this.tradeService.limitPopupMenuItem = 1;
    }

    get f() {
        return this.tradeService.buyOrSellAutomateForm.controls;
    }

}
