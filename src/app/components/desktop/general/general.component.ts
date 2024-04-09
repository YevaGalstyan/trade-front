import {Component, ElementRef, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {DesktopService} from '../../../services/desktop.service';
import {SharedService} from '../../../services/shared.service';
import {LocalizeService} from '../../../services/localize.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {HeaderService} from '../../../services/header.service';
import AOS from 'aos';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent extends BaseComponent implements OnInit, OnDestroy {

  authToken: string;
  qaModalStatus: boolean;
  showAnim1: boolean;
  showAnim2: boolean;
  screenWidth: number;

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public desktopService: DesktopService,
              private router: Router,
              private headerService: HeaderService) {
    super();
    this.getCommonModalStatus()
    this.headerService.generalPageHeader.next(true);
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.authToken = localStorage.getItem('user_token');
    this.screenWidth = screen.width

    AOS.init({
      once: true,
      easing: 'ease-in',
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.headerService.generalPageHeader.next(false);
  }

  openAccount(): void {
    this.router.navigate([this.authToken ? '/account' : '/welcome'])
  }

  private getCommonModalStatus() {
    this.desktopService.qaModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.qaModalStatus = updatedStatus;
    });
  }

}
