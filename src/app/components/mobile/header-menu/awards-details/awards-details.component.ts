import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-awards-details',
  templateUrl: './awards-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class AwardsDetailsComponent implements OnInit {

  closeAwardArr = [true, false, false, false, false, false]

  constructor(public localize: LocalizeService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.generalPageHeader.next(false);
  }

  changeAwardStatus(index): void {
    this.closeAwardArr[index] = !this.closeAwardArr[index];
  }

}
