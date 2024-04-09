import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../../services/localize.service';
import {ActivatedRoute} from '@angular/router';
import {UserAccountService} from '../../../../../services/userServices/user-account.service';
import {commonEnum} from '../../../../../shared/commonEnum'

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {

  accountId: number;

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public commonEnum: commonEnum,
              private route: ActivatedRoute) {
    this.userService.lastTransaction = 5;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
      this.userService.getTransactionHistory(this.accountId, 0, this.userService.lastTransaction);
    });
  }

  addPaginationTransaction(): void {
    this.userService.lastTransaction += 5;
    this.userService.getTransactionHistory(this.accountId, 0, this.userService.lastTransaction);
  }

}
