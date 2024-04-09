import {Injectable} from '@angular/core';
import {SharedService} from './shared.service';

// Language JSONs
import zh from '../localizers/zh.json';
import en from '../localizers/en.json';
import ru from '../localizers/ru.json';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  firstLanguage: string;
  secondLanguage: string;
  navigatorLanguage: string;
  language: any;

  constructor(private sharedService: SharedService) {
    this.getLocalization();
  }

  getLocalization(): void {
    this.sharedService.currentLanguage = localStorage.getItem('language');
    switch (this.sharedService.currentLanguage) {
      case 'zh-CH':
        this.language = zh;
        break;
      case 'ru':
        this.language = ru;
        break;
      default:
        this.language = en;
        break;
    }

    this.getLanguages();
  }

  getLanguages(): void {
    this.sharedService.currentLanguage = localStorage.getItem('language');
    switch (this.sharedService.currentLanguage) {
      case 'zh-CH':
        this.firstLanguage = 'ru';
        this.secondLanguage = 'en-US';
        break;
      case 'en-US':
        this.firstLanguage = 'zh-CH';
        this.secondLanguage = 'ru';
        break;
      case 'ru':
        this.firstLanguage = 'en-US';
        this.secondLanguage = 'zh-CH';
    }
  }

  getNavigatorLanguage(): void {
    switch (navigator.language) {
      case 'zh-CH':
        this.navigatorLanguage = 'zh-CH';
        break;
      case 'ru':
        this.navigatorLanguage = 'ru';
        break;
      default:
        this.navigatorLanguage = 'en-US';
        break;
    }
  }
}


