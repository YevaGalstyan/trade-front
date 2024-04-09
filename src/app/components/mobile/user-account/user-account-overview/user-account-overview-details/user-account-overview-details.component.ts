import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {UserAccountService} from '../../../../../services/userServices/user-account.service';
import {BaseComponent} from '../../../../base.component';
import {TradeService} from '../../../../../services/userServices/trade.service';

@Component({
  selector: 'app-user-account-overview-details',
  templateUrl: './user-account-overview-details.component.html',
})
export class UserAccountOverviewDetailsComponent extends BaseComponent{

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public tradeService: TradeService) {
    super();
  }

}
