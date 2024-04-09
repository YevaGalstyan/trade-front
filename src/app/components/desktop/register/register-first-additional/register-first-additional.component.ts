import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {SharedService} from '../../../../services/shared.service';
import {DesktopService} from '../../../../services/desktop.service';
import {CountriesAPIService} from '../../../../services/countries-api.service';

@Component({
  selector: 'app-register-first-additional',
  templateUrl: './register-first-additional.component.html',
})
export class RegisterFirstAdditionalComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              public sharedService: SharedService,
              public desktopService: DesktopService,
              public countriesApi: CountriesAPIService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(1);
    this.getCurrentValidators();
  }

  ngOnInit(): void {
  }

  chooseCountry(country): void {
    this.registerService.userRegisterForm.patchValue({
      country: country.name,
    });
    this.countriesApi.getCities(country.iso2);
    this.desktopService.toggleDropdownFirst();
  }

  chooseCity(city): void {
    this.registerService.userRegisterForm.patchValue({
      city: city.name,
    });
    this.desktopService.toggleDropdownSecond();
  }

  private getCurrentValidators(): void {
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'email');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'password');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'confirmPassword');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'verificationCode');
    this.sharedService.removeValidation(this.registerService.userRegisterForm, 'passport');

    this.sharedService.addValidation(this.registerService.userRegisterForm, 'country');
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'city');
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'actualAddress');
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'registrationAddress');
    this.sharedService.addValidation(this.registerService.userRegisterForm, 'phone');
  }

  get country(): string {
    return this.registerService.userRegisterForm.get('country').value
  }

  get city(): string {
    return this.registerService.userRegisterForm.get('city').value
  }

  get f(): any {
    return this.registerService.userRegisterForm.controls;
  }

}
