import {Component, OnInit} from '@angular/core';
import {LocalizeService} from '../../../../services/localize.service';
import AOS from "aos";


@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['../../general/general.component.scss']
})
export class FooterLinksComponent implements OnInit {

  constructor(public localize: LocalizeService) {
    AOS.init({
      once: true,
      easing: 'ease-in',
      duration: '1000',
    });
  }

  ngOnInit(): void {
  }

}
