import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {RegisterService} from './userServices/register.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLogOutService {

  isLogin = false;

  constructor(private ngZone: NgZone,
              private router: Router,
              private registerService: RegisterService) {
    if(this.isUserLoggedIn()){
      this.isLogin=true;
    }
    this.lastAction(Date.now());
    this.check();
    this.initListener();
    this.initInterval();
  }

  getLastAction() {
    return localStorage.getItem('lastAction');
  }

  lastAction(value) {
    localStorage.setItem('lastAction', JSON.stringify(value))
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, 1000);
    })
  }

  reset() {
    this.lastAction(Date.now());
  }

  check() {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + (30) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout && this.isLogin) {
        this.registerService.logOutUser();
      }
    });
  }

  isUserLoggedIn(): string {
    return localStorage.getItem('user_token');
  }
}
