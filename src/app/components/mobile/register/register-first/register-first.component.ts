import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {SharedService} from '../../../../services/shared.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-register-first',
  templateUrl: './register-first.component.html',
})
export class RegisterFirstComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              public sharedService: SharedService,
              public desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(1);
    this.getCurrentValidators()
  }

  ngOnInit(): void {
  }

  chooseCitizenship(citizenShip): void {
    this.registerService.userRegisterForm.patchValue({
      citizenship: citizenShip,
    })
    this.desktopService.toggleDropdownFirst();
  }

  private getCurrentValidators(): void {
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'email');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'password');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'confirmPassword');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'verificationCode');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'passport');

    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'country');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'city');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'actualAddress');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'registrationAddress');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'phone');
  }

  get citizen(): string {
    return this.registerService.userRegisterForm.get('citizenship').value
  }

  get f(): any {
    return this.registerService.userRegisterForm.controls;
  }

}
