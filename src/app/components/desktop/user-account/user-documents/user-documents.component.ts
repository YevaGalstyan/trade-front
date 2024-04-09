import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import {SharedService} from '../../../../services/shared.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';

@Component({
  selector: 'app-user-documents',
  templateUrl: './user-documents.component.html',
})
export class UserDocumentsComponent implements OnInit {

  constructor(public localize: LocalizeService,
              public sharedService: SharedService,
              public userService: UserAccountService) {
    this.userService.getUserDocuments();
  }

  ngOnInit(): void {
  }

}
