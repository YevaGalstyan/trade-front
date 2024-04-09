import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../../../services/desktop.service';
import {BaseComponent} from '../../../base.component';
import {UserAccountService} from '../../../../services/userServices/user-account.service';

@Component({
  selector: 'app-user-advance-payment',
  templateUrl: './user-advance-payment.component.html',
})
export class UserAdvancePaymentComponent extends BaseComponent implements OnInit, OnDestroy {

  invoiceIds: any[];
  commonModalStatus: boolean;
  termsModalStatus: boolean;

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
    this.getTermsModalStatus();
    this.redirectToInvoiceHistory();
  }

  ngOnDestroy() {
    this.userService.userPaymentSubmitted = false;
  }

  chooseInvoiceId(id): void {
    this.userService.userPaymentForm.patchValue({
      invoiceId: id
    });
    this.desktopService.toggleDropdownFirst();
  }

  chooseTerms(period): void {
    switch (true) {
      case Number(period) === 1:
        this.userService.periodTime = Number(period) + ' ' + this.localize.language.day;
        break;

      case Number(period) >= 2 && Number(period) <= 4:
        this.userService.periodTime = Number(period) + ' ' + this.localize.language.days;
        break;

      default:
        this.userService.periodTime = Number(period) + ' ' + this.localize.language.daysR;
        break;
    }

    let periodDate = new Date();
    periodDate.setDate(periodDate.getDate() + period);
    this.userService.userPaymentForm.patchValue({
      term: periodDate
    });
    this.desktopService.toggleDropdownSecond();
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

  private getTermsModalStatus() {
    this.desktopService.termsModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.termsModalStatus = updatedStatus;
    });
  }

  private redirectToInvoiceHistory(): void {
    this.userService.userInvoiceIds.pipe(takeUntil(this.$destroy)).subscribe(ids => {
      this.invoiceIds = ids;
    })
  }

  get f() {
    return this.userService.userPaymentForm.controls;
  }

  get id() {
    return this.userService.userPaymentForm.get('invoiceId').value;
  }

}
