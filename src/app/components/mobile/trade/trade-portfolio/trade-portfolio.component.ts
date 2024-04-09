import {Component, OnInit} from '@angular/core';
import {TradeService} from '../../../../services/userServices/trade.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';
import {DesktopService} from '../../../../services/desktop.service';
import {SocketService} from '../../../../services/socket.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';

@Component({
  selector: 'app-trade-portfolio',
  templateUrl: './trade-portfolio.component.html',
})
export class TradePortfolioComponent extends BaseComponent implements OnInit {

  tradeModalStatus: boolean;
  commonModalStatus: boolean;

  constructor(public tradeService: TradeService,
              private desktopService: DesktopService,
              private socketService: SocketService,
              private userService: UserAccountService) {
    super();
    this.tradeService.getMyTradings(false);
  }

  ngOnInit(): void {
    this.getTradeModalStatus();
    this.getCommonModalStatus();
    this.socketService.getSocketPortfolioData().subscribe((res: any) => {
      this.userService.getPortfolioUpdatedSettings(res);
    })
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
