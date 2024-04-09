import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {CompanyDetailsService} from '../../../../services/company-details.service';
import {BaseComponent} from '../../../base.component';
import {takeUntil} from 'rxjs/operators';
import AOS from 'aos';
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-ideas-details',
  templateUrl: './ideas-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class IdeasDetailsComponent extends BaseComponent implements OnInit, OnDestroy {

  authToken: string;
  popupStatus: boolean;

  constructor(public localize: LocalizeService,
              public detailsService: CompanyDetailsService,
              private headerService: HeaderService) {
    super();
    this.authToken = localStorage.getItem('user_token');
    this.detailsService.getIdeasDetails(localStorage.getItem('language'));

    AOS.init({
      once: true,
      easing: 'ease-in',
      duration: '1000',
    });
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.getPopupStatus();
    this.getChangedLanguage();
  }

  ngOnDestroy() {
    this.detailsService.closeIdeasPopup();
  }

  getChangedLanguage(): void {
    this.headerService.changedLanguage.pipe(takeUntil(this.$destroy)).subscribe(language => {
      this.detailsService.getIdeasDetails(language);
    })
  }

  getPopupStatus(): void {
    this.detailsService.ideasModalStatus.pipe(takeUntil(this.$destroy)).subscribe(status => {
      this.popupStatus = status;
    })
  }

}
