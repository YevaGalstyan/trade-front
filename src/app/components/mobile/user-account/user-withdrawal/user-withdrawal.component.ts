import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';
import {DesktopService} from '../../../../services/desktop.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-user-withdrawal',
  templateUrl: './user-withdrawal.component.html',
})
export class UserWithdrawalComponent extends BaseComponent implements OnInit, OnDestroy {

  invoiceIds: any[];
  commonModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public userService: UserAccountService,
              public desktopService: DesktopService) {
    super();
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
    this.redirectToInvoiceHistory();
  }

  ngOnDestroy() {
    this.userService.userWithdrawSubmitted = false;
    this.userService.withdrawErrorMessage = null;
  }

  chooseInvoiceId(id): void {
    this.userService.userWithdrawForm.patchValue({
      invoiceId: id
    });
    this.desktopService.toggleDropdownFirst();
  }

  chooseCoin(crypto):void {
    this.userService.userWithdrawForm.patchValue({
      cryptocurrency: crypto.coin,
    });
    this.desktopService.toggleDropdownSecond();
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

  private redirectToInvoiceHistory(): void {
    this.userService.userInvoiceIds.pipe(takeUntil(this.$destroy)).subscribe(ids => {
      this.invoiceIds = ids;
    })
  }

  get f() {
    return this.userService.userWithdrawForm.controls;
  }

  get id() {
    return this.userService.userWithdrawForm.get('invoiceId').value;
  }

  get crypto() {
    return this.userService.userWithdrawForm.get('cryptocurrency').value;
  }
}
