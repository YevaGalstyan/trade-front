import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RegisterService} from '../services/userServices/register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterSecondStepGuard implements CanActivate {

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

    if (!this.registerService.userRegisterForm && this.registerService.userRegisterForm.invalid
      || !fullName || !birthDate || !citizenship || !passportNumber
      || !country || !city || !actualAddress || !registrationAddress) {
      this.router.navigate(['/register/step-1']);
      return false;
    }
    return true;
  }

}
