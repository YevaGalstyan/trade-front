import {Injectable} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './httpServices/api.service';
import {url} from '../shared/requestURL';
import {DesktopService} from './desktop.service';
import {RegisterService} from './userServices/register.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  currentTheme: boolean;
  userStatus: boolean = true;
  authToken: string;
  currentLanguage: string | null;

  constructor(private api: ApiService,
              private desktopService: DesktopService) {
    this.authToken = localStorage.getItem('user_token')
  }

  addValidation(form: FormGroup, field: string, validators = null): void {
    form.get(field).setValidators(validators ? validators : [Validators.required]);
    form.get(field).updateValueAndValidity();
  }

  removeValidation(form: FormGroup, field: string): void {
    form.get(field).clearValidators();
    form.get(field).updateValueAndValidity();
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  updateUserSettings(): void {
    if(this.authToken) {
      const data = {
        theme: this.currentTheme ? 'light' : 'dark',
        language: this.currentLanguage
      }
      this.api.addData(url.updateUserSettings, data).subscribe(res => {
      })
    }
  }

  outerClose(event, dropdown, dropdownIcon= null) {
    if (event.target !== dropdown && event.target !== dropdownIcon) {
      this.desktopService.dropdownStatusFirst = false;
    }
  }

  outerCloseDouble(event, dropdown1, dropdownIcon1 = null, dropdown2, dropdownIcon2) {
    if (event.target !== dropdown1 && event.target !== dropdownIcon1 &&
        event.target !== dropdown2 && event.target !== dropdownIcon2) {
      this.desktopService.dropdownStatusFirst = false;
      this.desktopService.dropdownStatusSecond = false;
    }
  }

}
