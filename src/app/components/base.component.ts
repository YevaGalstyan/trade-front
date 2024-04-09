import {Component, OnDestroy} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({template: ``})

export class BaseComponent implements OnDestroy {

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  static checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  static DateValidator(control: AbstractControl): { [key: string]: any } {
    const dateStr = control.value;
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const invalidObj = {'date': true};

    if (dateStr) {
      const parts = dateStr.split('/');
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[0], 10);
      const year = parseInt(parts[2], 10);

      if (year < 1900 || year > 2022 || month === 0 || month > 12) {
        return invalidObj;
      }
      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
      }
      if (!(day > 0 && day <= monthLength[month - 1])) {
        return invalidObj;
      }
    }
    return null;
  }

  static numberValidator(control: FormControl): ValidatorFn | null {
    timer(0)
      .subscribe(() => {
        if (control && control.value) {
          control.setValue(control.value.toString().replace(/\D/g, ''));
        }
      });
    return null;
  }

  static numberValidatorNotFull(control: FormControl): ValidatorFn | null {
    timer(0)
      .subscribe(() => {
        if (control && control.value) {
          control.setValue(control.value.toString().replace(/([^\d]*)(\d*(\.\d{0,2})?)(.*)/, '$2'));
        }
      });
    return null;
  }

}
