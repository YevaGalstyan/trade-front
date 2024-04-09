import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from '../../../services/header.service';
import {LocalizeService} from '../../../services/localize.service';
import {SharedService} from '../../../services/shared.service';
import {DesktopService} from '../../../services/desktop.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent extends BaseComponent {

  authToken: string;
  qaModalStatus: boolean;

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
  }

  ngOnInit(): void {
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
