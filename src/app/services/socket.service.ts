import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../components/base.component';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService extends BaseComponent {

  dataUser$: BehaviorSubject<string> = new BehaviorSubject('');
  dataPortfolio$: BehaviorSubject<string> = new BehaviorSubject('');
  dataSymbol$: BehaviorSubject<string> = new BehaviorSubject('');

  private socket;

  constructor() {
    super();
    this.setUpSocket();
  }

  getSocketUserData = () => {
    this.socket.on('userUpdated', (res) => {
      this.dataUser$.next(res);
    });

    return this.dataUser$.asObservable();
  };

  getSocketPortfolioData = () => {
    this.socket.on('portfolioUpdated', (res) => {
      this.dataPortfolio$.next(res);
    });

    return this.dataPortfolio$.asObservable();
  };

  getSocketSymbolData = () => {
    this.socket.on('symbolUpdated', (res) => {
      this.dataSymbol$.next(res);
    });

    return this.dataSymbol$.asObservable();
  };

  private setUpSocket(): void {
    this.socket = io('ws://3.234.237.149:4000/', {
      transports: ['websocket'],
      auth: {
        id: localStorage.getItem('user_id')
      },
    });
  }
}
