import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {SharedService} from '../../../../services/shared.service';
import {Validators} from '@angular/forms';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-register-second',
  templateUrl: './register-second.component.html',
})
export class RegisterSecondComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public registerService: RegisterService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(2);
    this.getCurrentValidators();
  }

  ngOnInit(): void {
  }

  private getCurrentValidators(): void {
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'verificationCode');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'passport');

    this.sharedService.addValidation(this.registerService.userRegisterForm, 'email');
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'password',[Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,30}$/)]);
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'confirmPassword', Validators.required);
  }

  get f(): any {
    return this.registerService.userRegisterForm.controls;
  }

}
