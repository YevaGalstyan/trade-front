import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import AOS from "aos";
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-awards-details',
  templateUrl: './awards-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class AwardsDetailsComponent implements OnInit {

  constructor(public localize: LocalizeService,
              private headerService: HeaderService) {

    AOS.init({
      once: true,
      easing: 'ease-in',
    });

    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
  }

}
