import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {DesktopService} from '../../../services/desktop.service';
import {SharedService} from '../../../services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {MobileService} from '../../../services/mobile.service';
import {HeaderService} from '../../../services/header.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent extends BaseComponent implements OnInit, OnDestroy {

  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private sharedService: SharedService,
              private mobileService: MobileService,
              private headerService: HeaderService) {
    super();
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
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
