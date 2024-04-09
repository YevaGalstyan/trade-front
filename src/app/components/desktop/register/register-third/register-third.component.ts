import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {SharedService} from '../../../../services/shared.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-register-third',
  templateUrl: './register-third.component.html',
})
export class RegisterThirdComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public registerService: RegisterService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(3);
    this.getCurrentValidators();
  }

  ngOnInit(): void {
  }

  private getCurrentValidators(): void {
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'passport');

    this.sharedService.addValidation(this.registerService.userRegisterForm, 'verificationCode');
  }

  get f(): any {
    return this.registerService.userRegisterForm.controls;
  }
}
