import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authToken: string;

  constructor(private router: Router) {
    this.authToken = localStorage.getItem('user_token')
  }

  canActivate(): boolean {
    if (!this.authToken) {
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }

}
