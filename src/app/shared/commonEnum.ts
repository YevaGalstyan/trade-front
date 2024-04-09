import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class commonEnum {
  // Transaction Types
  readonly advancePaymentWithdraw = 1;
  readonly withdraw = 2;
  readonly topUp = 3;
  readonly bonus = 4;
  readonly advancePayment = 5;
  readonly dividend = 6;
  readonly writeOff = 7;

  // Trade Types
  readonly market = 1;
  readonly limit = 2;

  // Action Types
  readonly buy = 1;
  readonly sell = 2;

  //Limit action Types
  readonly buyLimit = 'BUY_LIMIT';
  readonly buyStop = 'BUY_STOP'
  readonly sellLimit = 'SELL_LIMIT';
  readonly sellStop = 'SELL_STOP';
  readonly BUY = 'BUY';
  readonly SELL = 'SELL'

}
