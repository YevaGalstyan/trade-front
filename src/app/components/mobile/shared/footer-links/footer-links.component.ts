import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class FooterLinksComponent implements OnInit {

  showFooter: boolean

  constructor(public localize: LocalizeService) {
  }

  ngOnInit(): void {
  }

  showAllFooter(): void {
    this.showFooter = true;
  }

}
