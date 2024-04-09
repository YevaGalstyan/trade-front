import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../components/base.component';
import {url} from '../../shared/requestURL';

// JSONs
import citizenShips from '../../../assets/JSON/citizenships.json';
import {ApiService} from '../httpServices/api.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';
import {UserAccountService} from './user-account.service';
import {TradeService} from './trade.service';
import {DatePipe} from '@angular/common';
import {DesktopService} from '../desktop.service';
import {CountriesAPIService} from '../countries-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  loginErrorMessage: string;
  emailValidationErrorMessage: string;
  verificationCodeErrorMessage: string;

  firstStepSubmitted: boolean;
  firstAddStepSubmitted: boolean;
  secondStepSubmitted: boolean;
  thirdStepSubmitted: boolean;
  thirdStepVerificationCode: boolean;
  forthStepSubmitted: boolean;
  passportUploadSizeErrorMessage: boolean;
  passportUploadTypeErrorMessage: boolean;
  validCitizenShip: boolean;
  validCountry: boolean;
  validCity: boolean;

  citizenShipsList = [];
  allCitizenShipsList = [];
  passwordImg = [];
  userRegisteredData: any;
  userRegisterForm: FormGroup;
  userLoginForm: FormGroup;


  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  currentRegisterStep: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private formBuilder: FormBuilder,
              private sharedService: SharedService,
              private userService: UserAccountService,
              private tradeService: TradeService,
              private api: ApiService,
              private router: Router,
              private desktopService: DesktopService,
              public countriesApi: CountriesAPIService) {
    this.userRegisterFormBuilder();
    this.userLoginFormBuilder();
    this.getCitizenShips();
    this.getUser();
  }

  setCurrentRegisterStep(step): void {
    this.currentRegisterStep.next(step);
  }

  private getCitizenShips(): void {
    citizenShips.forEach(citizenShip => {
      this.citizenShipsList.push(citizenShip);
      this.allCitizenShipsList = this.citizenShipsList;
    })
  }

  private userRegisterFormBuilder(): void {
    this.userRegisterForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      birthDate: [null, [Validators.required, BaseComponent.DateValidator]],
      citizenship: [null, Validators.required],
      country: null,
      city: null,
      actualAddress: null,
      registrationAddress: null,
      passportNumber: [null, Validators.required],
      email: null,
      passport: null,
      password: null,
      verificationCode: null,
      phone: null,
      confirmPassword: [null]
    }, {validators: BaseComponent.checkPasswords})
  }

  private userLoginFormBuilder(): void {
    this.userLoginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  // User registration functionality
  finishFirstStep(): void {
    this.firstStepSubmitted = true;
    this.validCitizenShip = this.allCitizenShipsList.includes(this.userRegisterForm.get('citizenship').value);
    if(this.validCitizenShip) {
      this.router.navigate([this.userRegisterForm.valid ? '/register/step-1-add' : '/register/step-1'])
    }
  }

  finishFirstStepAdd(): void {
    this.firstAddStepSubmitted = true;
    this.validCountry = this.countriesApi.allCountriesNames.includes(this.userRegisterForm.get('country').value);
    this.validCity = this.countriesApi.allCitiesNamesByCountry.includes(this.userRegisterForm.get('city').value);
    if(this.validCountry && this.validCity) {
      this.router.navigate([this.userRegisterForm.valid ? '/register/step-2' : '/register/step-1-add'])
    }
  }

  finishSecondStep(): void {
    this.secondStepSubmitted = true;
    if (this.userRegisterForm.valid) {
      this.registerUser();
    }
  }

  finishThirdStep(): void {
    this.thirdStepSubmitted = true;
    this.thirdStepVerificationCode = false;
    if (this.userRegisterForm.valid) {
      this.checkVerificationCode();
    }
  }

  finishForthStep(): void {
    this.forthStepSubmitted = true;
    if (this.userRegisterForm.valid && this.passwordImg.length === 2) {
      this.uploadPassportFirst();
    }
  }

  registerUser(): void {
    const data = {
      fullName: this.userRegisterForm.get('fullName').value,
      birthDate: this.userRegisterForm.get('birthDate').value,
      citizenship: this.userRegisterForm.get('citizenship').value,
      country: this.userRegisterForm.get('country').value,
      city: this.userRegisterForm.get('city').value,
      actualAddress: this.userRegisterForm.get('actualAddress').value,
      registrationAddress: this.userRegisterForm.get('registrationAddress').value,
      passportNumber: this.userRegisterForm.get('passportNumber').value,
      email: this.userRegisterForm.get('email').value,
      password: this.userRegisterForm.get('password').value,
      phone: this.userRegisterForm.get('phone').value.toString(),
    }

    this.api.addData(url.registerUser, data).subscribe(res => {
      if (!res.error) {
        this.userData.next(res.data);
        this.router.navigate(['/register/step-3']);
      } else {
        this.emailValidationErrorMessage = res.error;
      }
    })
  }

  getVerificationCode(): void {
    this.thirdStepSubmitted = false;
    this.thirdStepVerificationCode = true;

    const data = {
      email: this.userRegisterForm.get('email').value
    };
    this.api.addData(url.getVerificationCode, data).subscribe(res => {
    });
  }

  checkVerificationCode(): void {
    const data = {
      email: this.userRegisterForm.get('email').value,
      code: this.userRegisterForm.get('verificationCode').value
    };
    this.api.addData(url.checkEmailCode, data).subscribe(res => {
      if (res.error) {
        this.verificationCodeErrorMessage = res.error
      } else {
        this.router.navigate(['/register/step-4']);
      }
    });
  }

  addPassport(event): void {
    if (event.target.files[0]?.size > 10000 && event.target.files[0]?.size < 5000000
      && (event.target.files[0].type === 'image/png' || event.target.files[0].type == 'image/jpeg')) {
      this.passportUploadSizeErrorMessage = false;
      this.passportUploadTypeErrorMessage = false;
      this.passwordImg.push(event.target.files[0]);
      this.userRegisterForm.patchValue({passport: event.target.files[0]});
    }

    if (event.target.files[0]?.size < 10000 || event.target.files[0]?.size > 5000000) {
      this.passportUploadSizeErrorMessage = true;
    }

    if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg') {
      this.passportUploadTypeErrorMessage = true;
    }
  }

  removeFile(index): void {
    this.passwordImg.splice(index, 1);
  }

  uploadPassportFirst(): void {

    const data = new FormData()
    data.append('userId', this.userRegisteredData.id);
    data.append('passport', this.passwordImg[0])

    this.api.changeData(url.uploadPassport, data).subscribe(res => {
      if (!res.error) {
        this.uploadPassportSecond();
      }
    });
  }

  uploadPassportSecond(): void {

    const data = new FormData()
    data.append('userId', this.userRegisteredData.id);
    data.append('passport', this.passwordImg[1])

    this.api.changeData(url.uploadPassport, data).subscribe(res => {
      if (!res.error) {
        this.router.navigate(['/register/step-5']);
      }
    });
  }

  finishRegistration(): void {
    localStorage.setItem('user_token', this.userRegisteredData.authToken);
    window.location.reload();
    this.router.navigate(['/account']);
  }

  private getUser(): void {
    this.userData.subscribe(userData => {
      this.userRegisteredData = userData;
    })
  }

  // Login-logout functionality
  logInUser(): void {
    const data = {
      password: this.userLoginForm.get('password').value,
      email: this.userLoginForm.get('email').value,
    };

    if (this.userLoginForm.get('password').value && this.userLoginForm.get('email').value) {
      this.api.addData(url.loginUser, data).subscribe(res => {
        if (!res.error) {
          localStorage.setItem('user_token', res.data?.authToken);
          localStorage.setItem('user_id', res.data?.id);
          localStorage.setItem('user_name', res.data?.fullName);
          localStorage.setItem('language', res.data?.settings?.language);
          localStorage.setItem('theme', res.data?.settings?.theme);
          this.sharedService.userStatus = res.data.isActive;
          setTimeout(() => {
            window.location.reload();
            this.router.navigate(['/account']);
          }, 500);
        } else {
          this.loginErrorMessage = res.error
          this.userLoginForm.patchValue({password: ''});
        }
      });
    }
  }

  resetErrorMessage(): void {
    this.firstStepSubmitted = null;
    this.firstAddStepSubmitted = null;
    this.secondStepSubmitted = null;
    this.thirdStepSubmitted = null;
    this.loginErrorMessage = null;
    this.loginErrorMessage = null;
    this.emailValidationErrorMessage = null;
    this.verificationCodeErrorMessage = null;
  }

  logOutUser(): void {
    localStorage.removeItem('language');
    localStorage.removeItem('theme');
    localStorage.removeItem('user_id');

    this.sharedService.currentLanguage = 'en-US';
    this.sharedService.currentTheme = true;

    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');

    window.location.reload();
    this.router.navigate(['/login']);
  }

  getUserSettings(): void {
    const pipe = new DatePipe('en-US');

    this.api.getData(url.userSettings).subscribe(res => {
      if (!res.error) {
        this.sharedService.userStatus = res.data.isActive;
        this.userService.userCoinAddresses = res.data?.coinAddresses;
        this.tradeService.paymentSettings = res.data?.payment;
        this.userService.userInvoiceIds.next(res.data?.invoiceIds);
        this.userService.userAccountForm.patchValue({
          fullName: res.data?.fullName,
          birthDate: pipe.transform(res.data?.birthDate, 'yyyy-MM-dd'),
          phone: res.data?.phone,
          email: res.data?.email,
          country: res.data?.address?.country,
          city: res.data?.address?.city,
          address: res.data?.address?.actualAddress,
        });
      }
    })
  }

  showCitizenShips(): void {
    const value = this.userRegisterForm.get('citizenship').value;
    this.citizenShipsList = this.allCitizenShipsList;
    this.citizenShipsList = this.citizenShipsList.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase()) || val.toLowerCase().includes(value.toLowerCase()) ||
      val.toUpperCase().includes(value.toUpperCase()) || val.toUpperCase().includes(value.toUpperCase())
    );

    if(value) {
      this.desktopService.showDropdownFirst();
    } else {
      this.desktopService.closeDropdownFirst();
    }
  }

  showCountries(): void {
    const value = this.userRegisterForm.get('country').value;
    this.countriesApi.countriesList = this.countriesApi.allCountriesList;
    this.countriesApi.countriesList = this.countriesApi.countriesList.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase()) || val.name.toLowerCase().includes(value.toLowerCase()) ||
      val.name.toUpperCase().includes(value.toUpperCase()) || val.name.toUpperCase().includes(value.toUpperCase())
    );

    if(value) {
      this.desktopService.showDropdownFirst();
    } else {
      this.desktopService.closeDropdownFirst();
    }
  }

  showCities(): void {
    const value = this.userRegisterForm.get('city').value;
    this.countriesApi.citiesListByCountry = this.countriesApi.allCitiesListByCountry;
    this.countriesApi.citiesListByCountry = this.countriesApi.allCitiesListByCountry.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase()) || val.name.toLowerCase().includes(value.toLowerCase()) ||
      val.name.toUpperCase().includes(value.toUpperCase()) || val.name.toUpperCase().includes(value.toUpperCase())
    );

    if(value) {
      this.desktopService.showDropdownSecond();
    } else {
      this.desktopService.showDropdownSecond();
    }
  }

}
