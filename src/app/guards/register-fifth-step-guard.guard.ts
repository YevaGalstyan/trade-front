import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RegisterService} from '../services/userServices/register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFifthStepGuardGuard implements CanActivate {
  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  canActivate(): boolean {

    const fullName = this.registerService.userRegisterForm.get('fullName').value;
    const birthDate = this.registerService.userRegisterForm.get('birthDate').value;
    const citizenship = this.registerService.userRegisterForm.get('citizenship').value;
    const passportNumber = this.registerService.userRegisterForm.get('passportNumber').value;

    const country = this.registerService.userRegisterForm.get('country').value;
    const city = this.registerService.userRegisterForm.get('city').value;
    const actualAddress = this.registerService.userRegisterForm.get('actualAddress').value;
    const registrationAddress = this.registerService.userRegisterForm.get('registrationAddress').value;

    const email = this.registerService.userRegisterForm.get('email').value;
    const password = this.registerService.userRegisterForm.get('password').value;
    const confirmPassword = this.registerService.userRegisterForm.get('confirmPassword').value;

    const verificationCode = this.registerService.userRegisterForm.get('verificationCode').value;

    const passport = this.registerService.userRegisterForm.get('passport').value;

    if (!this.registerService.userRegisterForm && this.registerService.userRegisterForm.invalid
      || !fullName || !birthDate || !citizenship || !passportNumber
      || !country || !city || !actualAddress || !registrationAddress
      || !email || !password || !confirmPassword || !verificationCode || !passport) {
      this.router.navigate(['/register/step-1']);
      return false;
    }

    return true;
  }
}
