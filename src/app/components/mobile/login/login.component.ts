import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {DesktopService} from '../../../services/desktop.service';
import {BaseComponent} from '../../base.component';
import {takeUntil} from 'rxjs/operators';
import {RegisterService} from '../../../services/userServices/register.service';
import {SharedService} from '../../../services/shared.service';
import {MobileService} from '../../../services/mobile.service';
import {HeaderService} from '../../../services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              public desktopService: DesktopService,
              private sharedService: SharedService,
              private mobileService: MobileService,
              private headerService: HeaderService) {
    super();
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    registerService.userLoginForm.reset();
    desktopService.userStatus.next(false);
    mobileService.removeMobileBg = true;
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
  }

  ngOnDestroy() {
    this.mobileService.removeMobileBg = false;
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
