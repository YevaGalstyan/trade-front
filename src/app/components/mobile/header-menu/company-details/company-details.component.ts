import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {BaseComponent} from '../../../base.component';
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class CompanyDetailsComponent extends BaseComponent implements OnInit {


  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.generalPageHeader.next(false);
  }

}
