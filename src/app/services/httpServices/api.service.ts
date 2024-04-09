import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService) { }

  getData(url: string, baseUrl = environment.baseUrl): Observable<any> {
    return Observable.create(observer => {
      this.http.get(baseUrl, url).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  deleteData(url: string, baseUrl = environment.baseUrl): Observable<any> {
    return Observable.create(observer => {
      this.http.delete(baseUrl, url).subscribe((data: any) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  addData(url: string, data: any, baseUrl = environment.baseUrl): Observable<any> {
    return Observable.create(observer => {
      this.http.post(baseUrl, url, data).subscribe((response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  changeData(url: string, data: any, baseUrl = environment.baseUrl): Observable<any> {
    return Observable.create(observer => {
      this.http.put(baseUrl, url, data).subscribe((response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
  }
}
