import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-user-profile-data',
  templateUrl: './user-profile-data.component.html',
})
export class UserProfileDataComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public sharedService: SharedService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
  }

  ngOnInit(): void {
  }

  get f() {
    return this.userService.userAccountForm.controls;
  }

}
