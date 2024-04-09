import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesktopService {

  dropdownStatusFirst: boolean;
  dropdownStatusSecond: boolean;
  userStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userIconStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  termsModalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  commonModalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  qaModalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  // Popups
  openCommonSmallModal(): void {
    document.body.classList.add('prevent_scroll');
    this.commonModalStatus.next(true);
  }

  closeCommonSmallModal(): void {
    document.body.classList.remove('prevent_scroll');
    this.commonModalStatus.next(false);
  }

  openTermsModal(): void {
    document.body.classList.add('prevent_scroll');
    this.termsModalStatus.next(true);
  }

  closeTermsModal(): void {
    document.body.classList.remove('prevent_scroll');
    this.termsModalStatus.next(false);
  }

  openQAModal(): void {
    document.body.classList.add('prevent_scroll');
    this.qaModalStatus.next(true);
  }

  closeQAModal(): void {
    document.body.classList.remove('prevent_scroll');
    this.qaModalStatus.next(false);
  }

  // Dropdowns
  toggleDropdownFirst(): void {
    this.dropdownStatusFirst = !this.dropdownStatusFirst;
  }

  showDropdownFirst(): void {
    this.dropdownStatusFirst = true;
  }

  closeDropdownFirst(): void {
    this.dropdownStatusFirst = false;
  }

  toggleDropdownSecond(): void {
    this.dropdownStatusSecond = !this.dropdownStatusSecond;
  }

  showDropdownSecond(): void {
    this.dropdownStatusSecond = true;
  }

  closeDropdownSecond(): void {
    this.dropdownStatusSecond = false;
  }
}
