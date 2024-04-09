import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {LocalizeService} from '../../../../services/localize.service';
import {DesktopService} from '../../../../services/desktop.service';
import {MobileService} from '../../../../services/mobile.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../base.component';
import {url} from '../../../../shared/requestURL';
import {ApiService} from '../../../../services/httpServices/api.service';

@Component({
  selector: 'app-qa-popup',
  templateUrl: './qa-popup.component.html',
  styleUrls: ['../../../../../assets/scss/desktop/popup.scss']
})
export class QaPopupComponent implements OnInit {

  submitted: boolean;
  popupSubmittingError: boolean;
  qaForm: FormGroup;

  @ViewChild('innerModal') innerModal: ElementRef;

  constructor(public sharedService: SharedService,
              public localize: LocalizeService,
              public desktopService: DesktopService,
              public mobileService: MobileService,
              private formBuilder: FormBuilder,
              private api: ApiService) { }

  ngOnInit(): void {
    this.qaFormBuilder();
  }

  closeModal(event): void {
    if (!this.innerModal.nativeElement.contains(event.target)) {
      this.desktopService.closeQAModal();
    }
  }

  resetErrorMessage(): void {
    this.submitted = false;
  }

  submitQuestion(): void {
    this.submitted = true;
    const data = {
      name: this.qaForm.get('fullName').value,
      phone: this.qaForm.get('phoneNumber').value,
      question: this.qaForm.get('question').value,
    }

    this.api.addData(url.userSupportInquiry, data).subscribe(res => {
      if (res.error) {
        this.popupSubmittingError = res.error;
      } else {
        this.desktopService.closeQAModal();
      }
    });
  }

  private qaFormBuilder(): void {
    this.qaForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      phoneNumber: [null, [Validators.required, BaseComponent.numberValidator]],
      question: [null, Validators.required]
    })
  }

  get f() {
    return this.qaForm.controls;
  }

}
