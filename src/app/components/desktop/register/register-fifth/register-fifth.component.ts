import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {RegisterService} from '../../../../services/userServices/register.service';
import {DesktopService} from '../../../../services/desktop.service';

@Component({
  selector: 'app-register-fifth',
  templateUrl: './register-fifth.component.html',
})
export class RegisterFifthComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public registerService: RegisterService,
              private desktopService: DesktopService) {
    desktopService.dropdownStatusFirst = false;
    desktopService.dropdownStatusSecond = false;
    this.desktopService.commonModalStatus.next(false);
    registerService.setCurrentRegisterStep(5);
  }

  ngOnInit(): void {
  }

}
