import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'app-common-small-popup',
  templateUrl: './common-small-popup.component.html',
  styleUrls: ['../../../../../assets/scss/mobile/popupMobile.scss']
})
export class CommonSmallPopupComponent extends BaseComponent {

  @Input() popupTitle: string;
  @Input() popupText: string;
  @Input() forTrade: boolean;
  @Input() forOrder: boolean;

  @ViewChild('innerModal') innerModal: ElementRef;

  constructor(public sharedService: SharedService,
              public localize: LocalizeService,
              public desktopService: DesktopService) {
    super();

  }

  closeModal(event): void {
    if (!this.innerModal.nativeElement.contains(event.target)) {
      this.desktopService.closeCommonSmallModal();
    }
  }
}
