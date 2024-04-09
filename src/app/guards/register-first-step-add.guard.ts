import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {RegisterService} from '../services/userServices/register.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFirstStepAddGuard implements CanActivate {

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  canActivate(): boolean {
    const fullName = this.registerService.userRegisterForm.get('fullName').value;
    const birthDate = this.registerService.userRegisterForm.get('birthDate').value;
    const citizenship = this.registerService.userRegisterForm.get('citizenship').value;
    const passportNumber = this.registerService.userRegisterForm.get('passportNumber').value;

    if (!this.registerService.userRegisterForm || !fullName || !birthDate || !citizenship || !passportNumber) {
      this.router.navigate(['/register/step-1']);
      return false;
    }
    return true;
  }

}
