import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }

  get(baseUrl:string, url: string): Observable<any> {
    return this._http.get(baseUrl +  url);
  }

  post(baseUrl:string, url: string, data: any): Observable<any> {
    return this._http.post(baseUrl +  url, data);
  }

  put(baseUrl:string, url: string, data: any): Observable<any> {
    return this._http.put(baseUrl +  url, data);
  }

  delete(baseUrl:string, url: string): Observable<any> {
    return this._http.delete(baseUrl +  url);
  }
}
