import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-user-top-up',
  templateUrl: './user-top-up.component.html',
})
export class UserTopUpComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public userService: UserAccountService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
  }

  ngOnInit(): void {
  }

}
