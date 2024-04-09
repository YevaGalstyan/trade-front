import {Component, HostListener} from '@angular/core';
import {MobileService} from './services/mobile.service';
import {AutoLogOutService} from './services/auto-log-out.service';


@Component({
  selector: 'app-root',
  template: `
    <ng-container [ngSwitch]="mobileService.isMobile">
      <app-mobile *ngSwitchCase="true"></app-mobile>
      <app-desktop *ngSwitchCase="false"></app-desktop>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public mobileService: MobileService,
              private autoLogOut: AutoLogOutService) {
  }
}
