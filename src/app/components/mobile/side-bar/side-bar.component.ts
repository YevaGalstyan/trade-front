import { Component, OnInit } from '@angular/core';
import {MobileService} from '../../../services/mobile.service';
import {LocalizeService} from '../../../services/localize.service';
import {RegisterService} from '../../../services/userServices/register.service';
import {SharedService} from '../../../services/shared.service';
import {HeaderService} from '../../../services/header.service';
import {takeUntil} from 'rxjs/operators';
import {DesktopService} from '../../../services/desktop.service';
import {BaseComponent} from '../../base.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss', '../../desktop/header/header.component.scss', '../mobile.component.scss']
})
export class SideBarComponent extends BaseComponent implements OnInit {

  // Public
  authToken: string;
  sideBarStatus: boolean;

  constructor(public mobileService: MobileService,
              public localize: LocalizeService,
              public sharedService: SharedService,
              public headerService: HeaderService,
              public desktopService: DesktopService,
              public registerService: RegisterService,
              private router: Router) {
    super();
    this.authToken = localStorage.getItem('user_token');
  }

  ngOnInit(): void {
    this.getUserStatus();
    this.headerService.generalPageHeader.next(this.router.url === '/general');
  }

  private getUserStatus(): void {
    this.desktopService.userStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.headerService.userStatus = updatedStatus;
    });
  }

}
