import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {UserAccountService} from '../../../../../services/userServices/user-account.service';
import {SharedService} from '../../../../../services/shared.service';

@Component({
  selector: 'app-top-up-data',
  templateUrl: './top-up-data.component.html',
  styleUrls: ['./top-up-data.component.scss']
})
export class TopUpDataComponent implements OnInit {

  copiedToClipboard: boolean;

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  copyToClipboard(item): void {
    item['copiedToClipboard'] = true;
    setTimeout( () => {
      item['copiedToClipboard'] = false;
    }, 1000)
  }

}
