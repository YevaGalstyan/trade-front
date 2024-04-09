import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';
import AOS from "aos";
import {HeaderService} from '../../../../services/header.service';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class ContactsDetailsComponent extends BaseComponent implements OnInit {

  qaModalStatus: boolean;

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private headerService: HeaderService) {
    super();
    AOS.init({
      once: true,
      easing: 'ease-in',
      duration: '1000',
    });
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.getQAModalStatus();
  }

  private getQAModalStatus() {
    this.desktopService.qaModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.qaModalStatus = updatedStatus;
    });
  }

}
