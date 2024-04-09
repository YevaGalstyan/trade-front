import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  authToken: string;

  constructor() {
    this.authToken = localStorage.getItem('user_token')
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const clonedRequest = request.clone({
      headers: request
        .headers
        .set('token', this.authToken ? `Bearer ${this.authToken}` : '')
    });
    return next.handle(clonedRequest).toPromise();
  }
}
