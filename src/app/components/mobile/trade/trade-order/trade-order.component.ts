import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {TradeService} from '../../../../services/userServices/trade.service';
import {commonEnum} from '../../../../shared/commonEnum'
import {takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../../../services/desktop.service';
import {BaseComponent} from '../../../base.component';


@Component({
  selector: 'app-trade-order',
  templateUrl: './trade-order.component.html',
})
export class TradeOrderComponent extends BaseComponent implements OnInit {

  // Public
  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public tradeService: TradeService,
              public commonEnum: commonEnum,
              public desktopService: DesktopService) {
    super();
    this.tradeService.lastOrderCount = 5;
    this.tradeService.getMyOrders(0, 5);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
  }

  addPaginationTransaction(): void {
    this.tradeService.lastOrderCount += 5;
    this.tradeService.getMyOrders(0, this.tradeService.lastOrderCount);
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
