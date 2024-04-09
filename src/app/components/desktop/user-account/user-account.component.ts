import {Component, OnInit} from '@angular/core';
import {DesktopService} from '../../../services/desktop.service';
import {SharedService} from '../../../services/shared.service';
import {BaseComponent} from '../../base.component';
import {RegisterService} from '../../../services/userServices/register.service';
import {SocketService} from '../../../services/socket.service';
import {HeaderService} from '../../../services/header.service';
import {UserAccountService} from '../../../services/userServices/user-account.service';
import {TradeService} from '../../../services/userServices/trade.service';

@Component({
  selector: 'app-user-account',
  template:
    `
      <div class="user_global_section">
        <div class="user_global_block">
          <div class="user_menu_section">
            <app-user-account-menu></app-user-account-menu>
          </div>
          <div class="user_account_section">
            <router-outlet (activate)="onActivate()"></router-outlet>
          </div>
        </div>
      </div>
    `,
})
export class UserAccountComponent extends BaseComponent implements OnInit {

  constructor(public desktopService: DesktopService,
              private sharedService: SharedService,
              private registerService: RegisterService,
              private socketService: SocketService,
              private headerService: HeaderService,
              private userService: UserAccountService) {
    super();
    this.getUserStatus();
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.registerService.getUserSettings();
    this.socketService.getSocketUserData().subscribe((res: any) => {
      this.userService.getUserUpdatedSettings(res);
    })
  }

  onActivate() {
    window.scroll({top: 0, left: 0,});
  }

  private getUserStatus(): void {
    this.desktopService.userStatus.next(!!localStorage.getItem('user_token'));
  }

}
