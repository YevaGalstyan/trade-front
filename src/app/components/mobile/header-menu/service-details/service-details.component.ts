import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  constructor(public localize: LocalizeService,
              private headerService: HeaderService) {
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
  }

}
