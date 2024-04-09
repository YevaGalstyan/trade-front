import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';
import {takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../../../services/desktop.service';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
})
export class UserSupportComponent extends BaseComponent implements OnInit, OnDestroy {

  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public sharedService: SharedService,
              private desktopService: DesktopService) {
    super();
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
  }

  ngOnDestroy() {
    this.userService.userSupportSubmitted = null;
    this.userService.emailValidationErrorMessage = null;
  }

  get f() {
    return this.userService.userSupportForm.controls;
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
