import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';

@Component({
  selector: 'app-terms-and-conditions-popup',
  templateUrl: './terms-and-conditions-popup.component.html',
  styleUrls: ['./terms-and-conditions-popup.component.scss', '../../../../../assets/scss/desktop/popup.scss']
})
export class TermsAndConditionsPopupComponent implements OnInit {

  @Input() popupTitle: string;

  @ViewChild('innerModal') innerModal: ElementRef;

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              public userService: UserAccountService) { }

  ngOnInit(): void {
  }

  closeModal(event): void {
    if (!this.innerModal.nativeElement.contains(event.target)) {
      this.desktopService.closeTermsModal();
    }
  }

  get f() {
    return this.userService.userPaymentForm.controls;
  }

}
