import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {Router} from '@angular/router';
import {DesktopService} from '../../../services/desktop.service';
import {UserAccountService} from '../../../services/userServices/user-account.service';
import {RegisterService} from '../../../services/userServices/register.service';
import {TradeService} from '../../../services/userServices/trade.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {HeaderService} from '../../../services/header.service';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
})
export class TradeComponent extends BaseComponent implements OnInit {

  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public tradeService: TradeService,
              public router: Router,
              private socketService: SocketService,
              private desktopService: DesktopService,
              private registerService: RegisterService,
              private headerService: HeaderService) {
    super();
    router.events.subscribe(() => {
      this.tradeService.tradeCurrentMenu = this.router.url.substring(7, this.router.url.length);
    });
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
    this.registerService.getUserSettings();
    this.socketService.getSocketUserData().subscribe((res: any) => {
      this.userService.getUserUpdatedSettings(res);
    })
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
