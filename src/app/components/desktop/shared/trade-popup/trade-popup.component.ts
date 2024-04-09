import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {TradeService} from '../../../../services/userServices/trade.service';
import {SharedService} from '../../../../services/shared.service';
import {commonEnum} from '../../../../shared/commonEnum';

@Component({
  selector: 'app-trade-popup',
  templateUrl: './trade-popup.component.html',
  styleUrls: ['./trade-popup.component.scss']
})
export class TradePopupComponent implements OnInit {

  @Input() forTradePortfolio: boolean;

  @ViewChild('innerModal') innerModal: ElementRef;

  constructor(public localize: LocalizeService,
              public tradeService: TradeService,
              public sharedService: SharedService,
              public commonEnum: commonEnum) {
  }

  ngOnInit(): void {
  }

  closeModal(event): void {
    if (!this.innerModal.nativeElement.contains(event.target)) {
      this.tradeService.closeTradeModal();
      this.tradeService.buyOrSellChangeForm.reset();
    }
  }

  get f() {
    return this.tradeService.tradeForm;
  }
}
