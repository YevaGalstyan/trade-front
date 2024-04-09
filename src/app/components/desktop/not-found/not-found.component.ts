import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../services/localize.service';
import {HeaderService} from '../../../services/header.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['../general/general.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(public localize: LocalizeService,
              private headerService: HeaderService) {
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
  }

}
