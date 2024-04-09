import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {DesktopService} from '../../../services/desktop.service';
import {SharedService} from '../../../services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {HeaderService} from '../../../services/header.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent extends BaseComponent implements OnInit {

  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private headerService: HeaderService) {
    super();
    this.headerService.generalPageHeader.next(false);
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    desktopService.userStatus.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
