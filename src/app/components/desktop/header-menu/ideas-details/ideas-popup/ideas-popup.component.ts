import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {SharedService} from '../../../../../services/shared.service';
import {CompanyDetailsService} from '../../../../../services/company-details.service';

@Component({
  selector: 'app-ideas-popup',
  templateUrl: './ideas-popup.component.html',
  styleUrls: ['./ideas-popup.component.scss']
})
export class IdeasPopupComponent implements OnInit {

  authToken: string;

  @ViewChild('innerModal') innerModal: ElementRef;

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public detailsService: CompanyDetailsService) {
    this.authToken = localStorage.getItem('user_token');
  }

  ngOnInit(): void {
  }

  closeModal(event): void {
    if (!this.innerModal.nativeElement.contains(event.target)) {
      this.detailsService.closeIdeasPopup();
    }
  }

}
