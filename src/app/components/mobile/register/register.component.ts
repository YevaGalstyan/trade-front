import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {DesktopService} from '../../../services/desktop.service';
import {RegisterService} from '../../../services/userServices/register.service';
import {SharedService} from '../../../services/shared.service';
import {MobileService} from '../../../services/mobile.service';
import {HeaderService} from '../../../services/header.service';

@Component({
  selector: 'app-register',
  template:
    `
      <div class="register_global_section">
        <div class="register_global_block">
          <div class="register_step_section">
            <app-register-step></app-register-step>
          </div>
          <div>
            <router-outlet (activate)="onActivate()"></router-outlet>
          </div>
        </div>
      </div>
    `,
})
export class RegisterComponent implements OnDestroy {

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private sharedService: SharedService,
              private registerService: RegisterService,
              private mobileService: MobileService,
              private headerService: HeaderService) {
    registerService.userRegisterForm.reset();
    desktopService.userStatus.next(false);
    mobileService.removeMobileBg = true;
    this.headerService.generalPageHeader.next(false);
  }

  ngOnDestroy() {
    this.mobileService.removeMobileBg = false;
  }

  onActivate() {
    window.scroll({top: 0, left: 0,});
  }

}
