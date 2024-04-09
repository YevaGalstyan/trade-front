import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../../base.component';
import {take, takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-user-account-overview',
  templateUrl: './user-account-overview.component.html',
})
export class UserAccountOverviewComponent extends BaseComponent implements OnInit {

  invoiceIds: any[];
  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public userService: UserAccountService,
              public sharedService: SharedService,
              private desktopService: DesktopService,
              private router: Router) {
    super();
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    this.redirectToInvoiceHistory();
  }

  ngOnInit() {
    this.getCommonModalStatus();
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

  redirectToInvoiceHistory(): void {
    this.userService.userInvoiceIds.pipe(takeUntil(this.$destroy)).subscribe(ids => {
      if(ids) {
        this.invoiceIds = ids;
        this.router.navigate(['/account/account-overview/' + ids[0]])
      }
    })
  }

}
