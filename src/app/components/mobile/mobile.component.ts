import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../services/localize.service';
import {SharedService} from '../../services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../services/desktop.service';
import {HeaderService} from '../../services/header.service';
import {BaseComponent} from '../base.component';
import {MobileService} from '../../services/mobile.service';
import {RegisterService} from '../../services/userServices/register.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent extends BaseComponent implements OnInit {

  // Public
  sideBarStatus: boolean;
  authToken: string;

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public desktopService: DesktopService,
              public mobileService: MobileService,
              public headerService: HeaderService,
              public registerService: RegisterService) {
    super();
    this.authToken = localStorage.getItem('user_token');
  }

  ngOnInit(): void {
    this.getUserIconStatus();
    this.getUserStatus();
    this.getSidebarStatus();
    this.getHeaderStatus();
  }

  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
    });
  }

  private getUserIconStatus(): void {
    this.desktopService.userIconStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.headerService.userIconStatus = updatedStatus;
    });
  }

  private getHeaderStatus(): void {
    this.headerService.generalPageHeader.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      if(updatedStatus) {
        document.getElementById('mobileHeader')?.classList.add('general_header')
      } else {
        document.getElementById('mobileHeader')?.classList.remove('general_header')
      }
    });
  }

  private getUserStatus(): void {
    this.desktopService.userStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.headerService.userStatus = updatedStatus;
    });
  }

  private getSidebarStatus(): void {
    this.headerService.changeSidebar.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.sideBarStatus = updatedStatus;
    });
  }

}
