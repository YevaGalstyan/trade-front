import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {LocalizeService} from '../../../../services/localize.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../general.component.scss']
})
export class MapComponent implements OnInit {

  currentPinNumber: number;
  pinIsAvailable: boolean;

  displayedDetails = [
    {
      title: 'pin1Name',
      info: 'pin1Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST'],
    },

    {
      title: 'pin2Name',
      info: 'pin2Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST'],
    },

    {
      title: 'pin3Name',
      info: 'pin3Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin4Name',
      info: 'pin4Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin5Name',
      info: 'pin5Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin6Name',
      info: 'pin6Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin7Name',
      info: 'pin7Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin8Name',
      info: 'pin8Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin9Name',
      info: 'pin9Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin10Name',
      info: 'pin10Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin11Name',
      info: 'pin11Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin12Name',
      info: 'pin12Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin13Name',
      info: 'pin13Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin14Name',
      info: 'pin14Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin15Name',
      info: 'pin15Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin16Name',
      info: 'pin16Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },

    {
      title: 'pin17Name',
      info: 'pin17Info',
      workingHours: ['Пн-Чт 9:30 — 17:15 IST', 'Вс 9:30 — 16:25 IST'],
    },
  ]

  @ViewChildren('pin') pin: QueryList<ElementRef>;

  constructor(public sharedService: SharedService,
              public localize: LocalizeService) {
  }

  ngOnInit(): void {
  }

  seeDetails(pinNumber): void {
    this.currentPinNumber = pinNumber;
  }

  closeDetails(event): void {
    this.pinIsAvailable = false;

    this.pin.toArray().forEach(pin => {
      if(event.target === pin.nativeElement) {
        this.pinIsAvailable = true;
        return;
      }
    });

    if(!this.pinIsAvailable) {
      this.currentPinNumber = 0;
    }
  }
}
