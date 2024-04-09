import {Injectable} from '@angular/core';
import {LocalizeService} from './localize.service';
import {RegisterService} from './userServices/register.service';
import {DesktopService} from './desktop.service';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';
import {MobileService} from './mobile.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  // Public
  authToken: string;
  userName: string;
  userStatus: boolean;
  userIconStatus: boolean;
  logOutStatus: boolean;
  languageStatus: boolean;

  changeSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  changedLanguage: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('language'));
  generalPageHeader: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              public desktopService: DesktopService,
              public sharedService: SharedService,
              private mobileService: MobileService,
              private router: Router) {
    this.localize.getNavigatorLanguage();
    this.authToken = localStorage.getItem('user_token');
    this.userName = localStorage.getItem('user_name');

    // Language setup
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', this.localize.navigatorLanguage);
    }
    sharedService.currentLanguage = localStorage.getItem('language');
    localize.getLanguages();

    // Theme setup
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
    sharedService.currentTheme = localStorage.getItem('theme') === 'light';
    sharedService.currentTheme ? this.changeToLight() : this.changeToDark();
  }

  openLanguageDrpDwn(): void {
    this.languageStatus = !this.languageStatus;
    if (this.languageStatus && this.logOutStatus) {
      this.logOutStatus = false
    }
  }

  changeLanguage(language): void {
    this.sharedService.currentLanguage = language;
    this.changedLanguage.next(language);
    this.languageStatus = false;
    localStorage.setItem('language', this.sharedService.currentLanguage);
    this.localize.getLocalization();
    this.sharedService.updateUserSettings();
  }

  switchThemes(): void {
    this.sharedService.currentTheme = !this.sharedService.currentTheme;
    localStorage.setItem('theme', this.sharedService.currentTheme ? 'light' : 'dark');
    this.sharedService.currentTheme ? this.changeToLight() : this.changeToDark();
    this.sharedService.updateUserSettings();
  }

  changeToDark(): void {
    document.body.classList.add('dark-theme');
  }

  changeToLight(): void {
    document.body.classList.remove('dark-theme');
  }

  userIcon(): void {
    this.languageStatus = false;
    this.router.navigate(['/welcome']);
    this.closeSideBar();
  }

  openLogOut(): void {
    this.logOutStatus = !this.logOutStatus;
    if (this.logOutStatus && this.languageStatus) {
      this.languageStatus = false;
    }
  }

  openSideBar(): void {
    this.changeSidebar.next(true);
    this.generalPageHeader.next(false);
  }

  closeSideBar(): void {
    this.changeSidebar.next(false);
    this.generalPageHeader.next(this.router.url === '/general');
  }
}
