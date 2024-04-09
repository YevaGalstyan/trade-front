import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {SharedService} from '../../../services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {DesktopService} from '../../../services/desktop.service';
import {HeaderService} from '../../../services/header.service';
import {RegisterService} from '../../../services/userServices/register.service';
import {TradeService} from '../../../services/userServices/trade.service';
import {UserAccountService} from '../../../services/userServices/user-account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  commonModalStatus: boolean;
  authToken: string;

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              public desktopService: DesktopService,
              public headerService: HeaderService,
              public userService: UserAccountService,
              public sharedService: SharedService) {
    super();
    this.authToken = localStorage.getItem('user_token');
  }

  ngOnInit(): void {
    this.getUserStatus();
    this.getCommonModalStatus();
    this.getHeaderStatus();
  }

  private getUserStatus(): void {
    this.desktopService.userStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.headerService.userStatus = updatedStatus;
    });
  }

  private getHeaderStatus(): void {
    this.headerService.generalPageHeader.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      if(updatedStatus) {
        document.getElementById('desktopHeader')?.classList.add('general_header')
      } else {
        document.getElementById('desktopHeader')?.classList.remove('general_header')
      }
    });
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
