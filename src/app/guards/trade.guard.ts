import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TradeService} from '../services/userServices/trade.service';
import {HeaderService} from '../services/header.service';
import {url} from '../shared/requestURL';
import {ApiService} from '../services/httpServices/api.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradeGuard implements CanActivate {

  constructor(private tradeService: TradeService,
              private headerService: HeaderService,
              private http: HttpClient,
              private router: Router) {
  }

  canActivate(): boolean | Observable<boolean> {
    return this.checkUserAccess();
  }

  checkUserAccess() {
    const userAuth = localStorage.getItem('user_Id');
    if(!userAuth) {
      return this.http.get('https://home.imperialcg.com/' + url.userSettings).pipe(map(res => {
          if (!res['error'] && res['data']?.payment?.balance < 99.9) {
            this.router.navigate(['/welcome']);
            return false;
          }
          return true;
        })
      )
    } else {
      return false;
    }

  }

}
