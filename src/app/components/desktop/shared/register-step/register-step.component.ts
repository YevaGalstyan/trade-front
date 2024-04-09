import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../base.component';
import {RegisterService} from '../../../../services/userServices/register.service';
import {takeUntil} from 'rxjs/operators';
import {LocalizeService} from '../../../../services/localize.service';

@Component({
  selector: 'app-register-step',
  templateUrl: './register-step.component.html',
  styleUrls: ['./register-step.component.scss']
})
export class RegisterStepComponent extends BaseComponent implements OnInit {

  currentStep;
  stepsData = [
    {
      title: 'personalData',
      stepCount: 1,
      finalStepConfigs: true
    },
    {
      title: 'accountData',
      stepCount: 2,
      finalStepConfigs: true
    },
    {
      title: 'emailVerification',
      stepCount: 3,
      finalStepConfigs: true
    },
    {
      title: 'authentication',
      stepCount: 4,
      finalStepConfigs: true
    },
  ]

  constructor(public localize: LocalizeService,
              private registerService: RegisterService) {
    super();
    this.getCurrentStatus();
  }

  ngOnInit() {
    this.stepsData.forEach(data => {
      data.finalStepConfigs = data.stepCount !== 4
    });
  }

  private getCurrentStatus() {
    this.registerService.currentRegisterStep.pipe(takeUntil(this.$destroy)).subscribe(updatedStep => {
      this.currentStep = updatedStep;
    });
  }

}
