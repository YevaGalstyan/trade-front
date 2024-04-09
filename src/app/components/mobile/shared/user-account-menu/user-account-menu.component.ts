import { Component, OnInit } from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';

@Component({
  selector: 'app-user-account-menu',
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.scss']
})
export class UserAccountMenuComponent implements OnInit {

  menuData = [
    {
      title: 'accountOverview',
      routerLink: 'account-overview'
    },
    {
      title: 'profileData',
      routerLink: 'profile'
    },
    {
      title: 'topUp',
      routerLink: 'top-up'
    },
    {
      title: 'withdrawal',
      routerLink: 'withdrawal'
    },
    {
      title: 'advancePayment',
      routerLink: 'advance-payment'
    },
    {
      title: 'documents',
      routerLink: 'documents'
    },
    {
      title: 'supportService',
      routerLink: 'support'
    },
  ]

  constructor(public localize: LocalizeService) { }

  ngOnInit(): void {
  }

}
