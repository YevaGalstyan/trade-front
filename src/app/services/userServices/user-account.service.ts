import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {url} from '../../shared/requestURL';
import {ApiService} from '../httpServices/api.service';
import {DesktopService} from '../desktop.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {BaseComponent} from '../../components/base.component';
import {Router} from '@angular/router';
import {TradeService} from './trade.service';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  emailValidationErrorMessage: string;
  withdrawErrorMessage: string;
  periodTime: string;
  accountOverviewPopupHeader: string;
  accountOverviewPopupBody: string;

  userWithdrawSubmitted: boolean;
  removePagination: boolean;
  userSupportSubmitted: boolean;
  userPaymentSubmitted: boolean;
  userPaymentSubmittedPopup: boolean;
  userConditionsSuccessful: boolean;

  userTransactionLength: number;
  lastTransaction: number;

  userCoinAddresses: any[];
  userTransactionHistory: any[];
  userDocuments: any[];

  userPaymentFormInitial: any;

  userSupportForm: FormGroup;
  userAccountForm: FormGroup;
  userPaymentForm: FormGroup;
  userWithdrawForm: FormGroup;

  userInvoiceIds: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private desktopService: DesktopService,
              private tradeService: TradeService,
              private router: Router,
              private http: HttpClient,
              private sharedService: SharedService) {
    this.userSupportFormBuilder();
    this.userAccountFormBuilder();
    this.userPaymentFormBuilder();
    this.userWithdrawFormBuilder();
  }

  resetErrorMessage(): void {
    this.userPaymentSubmittedPopup = false;
    this.userPaymentSubmitted = false;
    this.userSupportSubmitted = false;
    this.userWithdrawSubmitted = false;
    this.emailValidationErrorMessage = null;
    this.withdrawErrorMessage = null;
  }

  submitSupportInquiry(): void {
    this.userSupportSubmitted = true;
    if (this.userSupportForm.valid) {
      this.sendSupportInquiry();
    }
  }

  redirectToToUp(): void {
    this.router.navigate(['/account/top-up']);
  }

  userTradingPopup(): void {
    this.router.navigate(['/trade']);
  }

  addNewInvoice(): void {
    this.accountOverviewPopupHeader = 'newInvoiceHeader';
    this.accountOverviewPopupBody = 'newInvoiceText';
    this.desktopService.openCommonSmallModal();
  }

  finishPayment(): void {
    this.userPaymentSubmitted = true;
    if (this.userPaymentForm.valid) {
      this.desktopService.openTermsModal();
    }
  }

  finishPaymentRequest(): void {
    this.userPaymentSubmittedPopup = true;
    const agreed = this.userPaymentForm.get('agreeTerms').value;
    if (agreed) {
      this.sendPaymentRequest();
    }
  }

  finishWithdraw(): void {
    this.userWithdrawSubmitted = true;
    if (this.userWithdrawForm.valid) {
      this.sendWithdrawRequest();
    }
  }

  getTransactionHistory(id, skip, last): void {
    const data = {
      invoiceId: id.toString(),
      skip: skip,
      limit: last,
    }
    this.api.addData(url.transactionHistory, data).subscribe(res => {
      if (!res.error) {
        this.userTransactionHistory = res.data?.transactions;
        this.userTransactionLength = res.data?.count;
        this.removePagination = this.lastTransaction >= this.userTransactionLength;
      }
    });
  }

  sendAgreeConditions(): void {
    const data = {
      isAgree: this.userPaymentForm.get('agreeTerms').value
    };

    this.api.addData(url.agreeConditions, data).subscribe(res => {
      if (res.error) {
        this.userConditionsSuccessful = true;
      }
    });
  }

  termsConditionsDownload(): void {

  }

  getUserDocuments(): void {
    this.api.getData(url.getUserDocuments).subscribe(res => {
      if (!res.error) {
        this.userDocuments = res.data;
      }
    });
  }


  downloadUserDocument(id): Observable<Blob> {
    return this.http.get('https://home.imperialcg.com/user/getDoc' + '?fileId=' + id, {
      responseType: 'blob'
    })
  }

  getUserDocument(id, name):void  {
    this.downloadUserDocument(id)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = name;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  getUserUpdatedSettings(res): void {
    if(this.tradeService.paymentSettings?.balance) {
      this.tradeService.paymentSettings.balance = res.user?.balance;
    }
    if(this.tradeService.paymentSettings?.marja) {
      this.tradeService.paymentSettings.marja = res.user?.marja;
    }
    if(this.tradeService.paymentSettings?.freeMarja) {
      this.tradeService.paymentSettings.freeMarja = res.user?.freeMarja;
    }
    if(this.tradeService.paymentSettings?.fund) {
      this.tradeService.paymentSettings.fund = res.user?.fund;
    }

    this.sharedService.userStatus = res.user?.isActive;
    this.userAccountForm.patchValue({
      fullName: res.user?.fullName,
    });
  }

  getPortfolioUpdatedSettings(res): void {
    if(res?.arrayLength) {
      this.tradeService.myTransactionData = res?.data;
      this.tradeService.myTransactionLength = res?.arrayLength;
      this.removePagination = this.tradeService.lastTransactionCount >= this.tradeService.myTransactionLength;
    }
  }

  getSymbolsUpdatedSettings(res): void {
    if(localStorage.getItem('symbol') == res.symbol && res.history.length) {
      this.tradeService.chartOptions = {
        series: [
          {
            name: 'candle',
            data: res.history
          }
        ],
        chart: {
          type: 'candlestick',
          height: window.innerHeight - 120,
          width: window.innerWidth - 20,

          toolbar: {
            tools: {
              download: '<img src="../../../assets/images/shared/graphic/download.svg" width="28">',
              zoom: '<img src="../../../assets/images/shared/graphic/zoom.svg" width="25">',
              zoomin: '<img src="../../../assets/images/shared/graphic/zoomIn.svg" width="30">',
              zoomout: '<img src="../../../assets/images/shared/graphic/zoomOut.svg" width="30">',
              pan: '<img src="../../../assets/images/shared/graphic/selection.svg" width="34">',
              reset: '<img src="../../../assets/images/shared/graphic/reset.svg" width="25">',
            },
            export: {
              csv: {
                filename: localStorage.getItem('symbol') + 'chart',
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'value',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString()
                }
              },
              svg: {
                filename: localStorage.getItem('symbol') + 'chart',
              },
              png: {
                filename: localStorage.getItem('symbol') + 'chart',
              }
            },
          },
        },
        title: {
          text: localStorage.getItem('symbol'),
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      };
    }
  }

  private sendWithdrawRequest(): void {
    const data = {
      withdrawMoney: this.userWithdrawForm.get('withdrawMoney').value,
      cryptocurrency: this.userWithdrawForm.get('cryptocurrency').value,
      invoiceId: this.userWithdrawForm.get('invoiceId').value.toString(),
      coinAddress: this.userWithdrawForm.get('coinAddress').value,

    };
    this.api.addData(url.userWithdraw, data).subscribe(res => {
      if (!res.error) {
        this.desktopService.openCommonSmallModal();
        this.userWithdrawForm.reset();
        this.userWithdrawSubmitted = false;
      } else {
        this.withdrawErrorMessage = res.error;
      }
    });
  }

  private sendPaymentRequest(): void {
    const data = {
      invoiceId: this.userPaymentForm.get('invoiceId').value.toString(),
      money: this.userPaymentForm.get('amount').value,
      timeForAdvancedPayment: this.userPaymentForm.get('term').value
    }
    this.api.addData(url.advancePayment, data).subscribe(res => {
      if (!res.error) {
        this.userPaymentForm.reset(this.userPaymentFormInitial);
        this.periodTime = null;
        this.userPaymentSubmitted = false;
        this.userPaymentSubmittedPopup = false
        this.desktopService.closeTermsModal();
        this.desktopService.openCommonSmallModal();
      }
    });
  }

  private sendSupportInquiry(): void {
    const data = this.userSupportForm.value;

    this.api.addData(url.userSupportInquiry, data).subscribe(res => {
        this.userSupportForm.reset();
        this.userSupportSubmitted = false;
        this.desktopService.openCommonSmallModal();
    });
  }

  private userPaymentFormBuilder(): void {
    this.userPaymentForm = this.formBuilder.group({
      invoiceId: [null, Validators.required],
      amount: [null, [Validators.required, BaseComponent.numberValidatorNotFull]],
      term: [null, Validators.required],
      agreeTerms: false,
    })

    this.userPaymentFormInitial = this.userPaymentForm.value;
  }

  private userSupportFormBuilder(): void {
    this.userSupportForm = this.formBuilder.group({
      email: [null, Validators.required],
      question: [null, Validators.required]
    })
  }

  private userAccountFormBuilder(): void {
    this.userAccountForm = this.formBuilder.group({
      fullName: null,
      birthDate: null,
      phone: null,
      email: null,
      country: null,
      city: null,
      address: null,
    });
  }

  private userWithdrawFormBuilder(): void {
    this.userWithdrawForm = this.formBuilder.group({
      withdrawMoney: [null, [Validators.required, BaseComponent.numberValidatorNotFull]],
      cryptocurrency: [null, Validators.required],
      invoiceId: [null, Validators.required],
      coinAddress: [null, Validators.required],
    })
  }
}
