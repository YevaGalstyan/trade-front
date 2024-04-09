import {Injectable} from '@angular/core';
import {ApiService} from './httpServices/api.service';
import {url} from '../shared/requestURL';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  finalCurrentPercentage: any;

  ideasDetails: any[];
  currentCountryContacts: any[];

  ideasDetail: any;

  ideasModalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private api: ApiService) {
  }

  closeIdeasPopup(): void {
    this.ideasModalStatus.next(false);
  }

  getIdeasDetails(language): void {
    const data = {
      language: '',
    }

    switch (language) {
      case 'ru':
        data.language = 'RU';
        break;
      case 'en-US':
        data.language = 'US';
        break;
      case 'zh-CH':
        data.language = 'CH';
        break;
    }

    this.api.addData(url.investmentIdeas, data).subscribe(res => {
      this.ideasDetails = res.data;
    })
  }

  getCompanyContacts(country): void {
    this.currentCountryContacts = [];

    this.api.addData(url.contactDetailByCountry, {country: country}).subscribe(res => {
      this.currentCountryContacts = res.data;
    })
  }

  getIdeaDetails(id): void {
    const data = {
      id: id
    }
    this.api.addData(url.investmentIdea, data).subscribe(res => {
      if(!res.error) {
        this.ideasDetail = res.data;
        this.finalCurrentPercentage = Number(res.data.currentPercentage.replace('%', ''));
        this.ideasModalStatus.next(true);
      }
    })
  }
}
