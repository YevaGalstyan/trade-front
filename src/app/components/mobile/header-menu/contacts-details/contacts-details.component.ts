import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../base.component';
import {HeaderService} from '../../../../services/header.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['../../general/general.component.scss', '../../shared/user-account-menu/user-account-menu.component.scss']
})
export class ContactsDetailsComponent extends BaseComponent implements OnInit {

  commonModalStatus: boolean;
  contact: string = 'usa';

  menuData = [
    {
      title: 'usa',
      routerLink: '/contact/usa'
    },
    {
      title: 'china',
      routerLink: '/contact/china'
    },
    {
      title: 'russia',
      routerLink: '/contact/russia'
    },
    {
      title: 'uk',
      routerLink: '/contact/uk'
    },
  ]

  constructor(public localize: LocalizeService,
              public desktopService: DesktopService,
              private headerService: HeaderService,
              private router: Router) {
    super();
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.getCommonModalStatus();
  }

  chooseContactInfo(contact): void {
    this.contact = contact;
    this.router.navigate(['/contact/' + contact]);
    this.desktopService.toggleDropdownFirst();
  }

  private getCommonModalStatus() {
    this.desktopService.commonModalStatus.pipe(takeUntil(this.$destroy)).subscribe(updatedStatus => {
      this.commonModalStatus = updatedStatus;
    });
  }

}
