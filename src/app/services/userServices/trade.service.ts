import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {url} from '../../shared/requestURL';
import {ApiService} from '../httpServices/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../components/base.component';
import {Router} from '@angular/router';
import {DesktopService} from '../desktop.service';
import {ChartOptions} from '../../components/desktop/trade-widget/trade-apex-widget/trade-apex-widget.component';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  myTransactionLength: number;
  myTransactionSearchLength: number;
  myOrderLength: number;
  lastTransactionCount: number;
  lastSearchCount: number;
  lastOrderCount: number;
  limitPopupMenuItem: number;
  currentOrderId: number;

  limitPopupModalSubmitted: boolean;
  removePagination: boolean;

  tradeCurrentMenu: string = 'portfolio';
  tradePortfolioPopupText: string;
  tradePortfolioPopupHeader: string;
  tradeStocksPopupText: string
  tradeStocksPopupHeader: string
  orderPopupText: string;
  searchValue: string;

  paymentSettings: any;
  tradeModalData: any;
  buyOrSellManualInitial: any;
  buyOrSellAutomateInitial: any;

  MOEXStocksData: any[];
  myTransactionData: any[];
  myOrderData: any[];

  searchTermForm: FormControl;
  tradeForm: FormControl;
  buyOrSellManualForm: FormGroup;
  buyOrSellAutomateForm: FormGroup;
  buyOrSellChangeForm: FormGroup;

  tradeModalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public chartOptions: Partial<ChartOptions>;


  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private desktopService: DesktopService,
              private router: Router) {

    this.searchTermFormBuilder();
    this.tradeFormBuilder();
    this.buyOrSellManualFormBuilder();
    this.buyOrSellAutomateFormBuilder();
    this.buyOrSellChangeFormBuilder();
  }

  // Trade lists functionality
  getMenuItem(menuItem: number, actionType): void {
    this.limitPopupMenuItem = menuItem;

    const initial = {
      count: 0.90,
      priceWhen: null,
      topLimit: null,
      bottomLimit: null,
      symbol: null,
      actionType: actionType,
    };

    this.buyOrSellAutomateForm.reset(initial);
  }

  getMOEXStocksData(skip, last): void {
    const data = {
      skip: skip,
      limit: last,
    }

    this.api.addData(url.tradeSymbols, data).subscribe(res => {
      if (!res.error) {
        this.myTransactionLength = res.data?.arrayLength;
        this.MOEXStocksData = res.data?.symbolsWithPrice;
        this.removePagination = this.lastTransactionCount >= this.myTransactionLength;
      }
    })
  }

  getMyTradings(isClosed, skip = null, last = null): void {
    const data = {
      skip: skip,
      limit: last,
      isClosed: isClosed,
    }

    this.api.addData(url.getMyTradings, data).subscribe(res => {
      if (!res.error) {
        this.myTransactionData = res.data?.tradings;
        this.myTransactionLength = res.data?.arrayLength;
        this.removePagination = this.lastTransactionCount >= this.myTransactionLength;
      }
    })
  }

  searchFilter(value: string, limit: number): void {
    if (value) {
      this.searchValue = value;
      const data = {
        skip: 0,
        limit: limit,
        text: value
      }

      this.api.addData(url.searchStocks, data).subscribe(res => {
        if (!res.data.error) {
          this.MOEXStocksData = res.data.symbolsWithPrice;
          this.myTransactionSearchLength = res.data?.arrayLength;
          this.removePagination = this.lastSearchCount >= this.myTransactionSearchLength;
        }
      })
    } else {
      this.getMOEXStocksData(0, this.lastTransactionCount);
    }
  }

  // Trade popup functionality
  goToSymbolGraphic(symbolData, isStock): void {
    if(!symbolData?.graphicType) {
      localStorage.setItem('symbol', isStock ? symbolData?.symbol.replace(/\//g, '') : symbolData?.symbolName.replace(/\//g, ''));
    } else {
      localStorage.setItem('symbol', isStock ? symbolData?.symbol : symbolData?.symbolName);
    }
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/graphic' + '/type-' + (!symbolData?.graphicType ? '1' : '2')])
    );

    window.open(url, '_blank');
  }

  getCustomGraphicData(): void {
    const data = {
      symbol: localStorage.getItem('symbol')
    }
    this.api.addData(url.customGraphicData, data).subscribe(res => {
      if (!res.error) {
        this.chartOptions = {
          series: [
            {
              name: 'candle',
              data: res.data
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
    })
  }

  getTradeModal(symbolData): void {
    this.tradeModalData = symbolData;
    if (this.tradeModalData.symbolDetail?.is_market_open) {
      this.openTradeModal();
    } else {
      this.tradeStocksPopupText = 'operationNotAvailableText';
      this.tradeStocksPopupHeader = 'operationNotAvailable';
      this.desktopService.openCommonSmallModal();
    }
  }

  getTradePortfolioModal(symbolData): void {
    this.tradeModalData = symbolData;
    if (this.tradeModalData.symbolDetail?.is_market_open) {
      this.openTradeModal();

      this.buyOrSellChangeForm.patchValue({
        topLimit: symbolData?.topLimit,
        bottomLimit: symbolData?.bottomLimit,
      })
    } else {
      this.tradePortfolioPopupText = 'operationNotAvailableText';
      this.tradePortfolioPopupHeader = 'operationNotAvailable';
      this.desktopService.openCommonSmallModal();
    }
  }

  changeTradePortfolio(close: boolean): void {
    const data = {
      topLimit: this.buyOrSellChangeForm.get('topLimit').value,
      bottomLimit: this.buyOrSellChangeForm.get('bottomLimit').value,
      tradeId: this.tradeModalData?.id,
      close: close
    }
    this.api.addData(url.updateTrading, data).subscribe(res => {
      if (!res.error) {
        this.tradePortfolioPopupText = close ? 'yourPositionClosed' : 'yourPositionChanged';
        this.tradePortfolioPopupHeader = 'positionChange';
        this.closeTradeModal();
        this.desktopService.openCommonSmallModal();
        this.getMyTradings(false, 0, this.lastTransactionCount);
      }
    })
  }

  changeCount(change: number, type: string, formGroup: FormGroup): void {
    const count = Number(formGroup.get('count').value);
    const modifiedCount = type === 'plus' ? Math.round((count + change) * 100) / 100 : Math.round((count - change) * 100) / 100;
    formGroup.patchValue({
      count: modifiedCount >= 0.90 ? modifiedCount : 0.90
    });
  }

  buyOrSellManual(): void {
    const data = this.buyOrSellManualForm.value

    this.api.addData(url.buyOrSellManual, data).subscribe(res => {
      this.tradeStocksPopupText = !res.error ? 'successfullyOpened' : 'notEnoughSupplies';
      this.tradeStocksPopupHeader = 'openDeal';
      this.closeTradeModal();
      this.desktopService.openCommonSmallModal();
    })
  }

  finishManualAction(type: string): void {
    this.buyOrSellManualForm.patchValue({
      symbol: this.tradeModalData?.symbol,
      currentPrice: this.tradeModalData?.symbolDetail?.price,
      actionType: type
    })

    if (this.buyOrSellManualForm.valid) {
      this.buyOrSellManual();
    }
  }

  resetPopupError(): void {
    this.limitPopupModalSubmitted = false;
  }

  changeTradeType(type): void {
    this.tradeForm.patchValue(type);
  }

  buyOrSellAutomate(): void {
    const data = this.buyOrSellAutomateForm.value

    this.api.addData(url.buyOrSellAutomate, data).subscribe(res => {
      this.tradeStocksPopupText = !res.error ? 'successfullyOpenedOrder' : 'notEnoughSuppliesLimit';
      this.tradeStocksPopupHeader = 'openDeal';
      this.closeTradeModal();
      this.desktopService.openCommonSmallModal();
    })
  }

  finishAutomateAction(): void {
    this.limitPopupModalSubmitted = true;

    this.buyOrSellAutomateForm.patchValue({
      symbol: this.tradeModalData?.symbol,
      currentPrice: this.tradeModalData?.symbolDetail?.price,
    });

    if (this.buyOrSellAutomateForm.valid) {
      this.buyOrSellAutomate();
    }
  }

  openTradeModal(): void {
    document.body.classList.add('prevent_scroll');
    this.tradeModalStatus.next(true);
  }

  closeTradeModal(): void {
    this.tradeModalData = null;
    this.limitPopupModalSubmitted = false;
    this.buyOrSellManualForm.reset(this.buyOrSellManualInitial);
    this.buyOrSellAutomateForm.reset(this.buyOrSellAutomateInitial);
    this.tradeModalStatus.next(false);
    this.tradeForm.patchValue(1);
    document.body.classList.remove('prevent_scroll');
  }

  checkInputValue(event): void {
    if (event.target.value > 100000000) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  getMyOrders(skip, last): void {
    const data = {
      limit: last,
      skip: skip
    }
    this.api.addData(url.getMyOrder, data).subscribe(res => {
      this.myOrderData = res.data?.orders;
      this.myOrderLength = res.data?.count;
      this.removePagination = this.lastOrderCount >= this.myOrderLength;
    })
  }

  openOrderPopup(id): void {
    this.currentOrderId = id;
    this.orderPopupText = 'closingOrderText';
    this.desktopService.openCommonSmallModal();
  }

  closeOrder(): void {
    const data = {
      orderId: this.currentOrderId
    }
    this.api.addData(url.cancelOrder, data).subscribe(res => {
      if (!res.error) {
        this.currentOrderId = null;
        this.orderPopupText = 'successfullyClosedOrder';
        this.getMyOrders(0, 5);
      }
    })
  }

  private searchTermFormBuilder(): void {
    this.searchTermForm = this.formBuilder.control(null);
  }

  private tradeFormBuilder(): void {
    this.tradeForm = this.formBuilder.control(1);

  }

  private buyOrSellManualFormBuilder(): void {
    this.buyOrSellManualForm = this.formBuilder.group({
      count: [0.90, [Validators.required, BaseComponent.numberValidatorNotFull]],
      topLimit: [null, [BaseComponent.numberValidatorNotFull]],
      bottomLimit: [null, [BaseComponent.numberValidatorNotFull]],
      symbol: [null, Validators.required],
      currentPrice: [null, Validators.required],
      actionType: [null, Validators.required],
    });

    this.buyOrSellManualInitial = this.buyOrSellManualForm.value;
  }

  private buyOrSellAutomateFormBuilder(): void {
    this.buyOrSellAutomateForm = this.formBuilder.group({
      count: [0.90, [Validators.required, BaseComponent.numberValidatorNotFull]],
      priceWhen: [null, [Validators.required, BaseComponent.numberValidatorNotFull]],
      topLimit: [null, [BaseComponent.numberValidatorNotFull]],
      bottomLimit: [null, [BaseComponent.numberValidatorNotFull]],
      symbol: [null, Validators.required],
      actionType: ['BUY_LIMIT', Validators.required],
    });

    this.buyOrSellAutomateInitial = this.buyOrSellAutomateForm.value;
  }

  private buyOrSellChangeFormBuilder(): void {
    this.buyOrSellChangeForm = this.formBuilder.group({
      topLimit: [null, [BaseComponent.numberValidatorNotFull, Validators.required]],
      bottomLimit: [null, [BaseComponent.numberValidatorNotFull, Validators.required]],
    });
  }
}
