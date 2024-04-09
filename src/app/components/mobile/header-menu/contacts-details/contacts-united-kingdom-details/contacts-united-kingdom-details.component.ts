import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {SharedService} from '../../../../../services/shared.service';
import {CompanyDetailsService} from '../../../../../services/company-details.service';

@Component({
  selector: 'app-contacts-united-kingdom-details',
  templateUrl: './contacts-united-kingdom-details.component.html',
  styleUrls: ['../../../general/general.component.scss']
})
export class ContactsUnitedKingdomDetailsComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public companyService: CompanyDetailsService) {
    this.companyService.getCompanyContacts('UK');
  }

  ngOnInit(): void {
  }

}
