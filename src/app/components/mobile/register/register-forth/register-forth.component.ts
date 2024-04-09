import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {SharedService} from '../../../../services/shared.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-register-forth',
  templateUrl: './register-forth.component.html',
})
export class RegisterForthComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              private sharedService: SharedService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(4);
    this.getCurrentValidators();
  }

  ngOnInit(): void {
  }

  private getCurrentValidators(): void {
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'passport');
  }

  get f(): any {
    return this.registerService.userRegisterForm.controls;
  }

}
