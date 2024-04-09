import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {BaseComponent} from '../base.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['desktop.component.scss']
})
export class DesktopComponent extends BaseComponent implements OnInit {

  constructor(public sharedService: SharedService) {
    super();
  }

  ngOnInit(): void {
  }

  onActivate() {
    window.scroll({top: 0, left: 0,});
  }
}
