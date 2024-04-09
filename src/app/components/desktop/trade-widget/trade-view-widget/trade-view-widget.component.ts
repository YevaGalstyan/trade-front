import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {HeaderService} from '../../../../services/header.service';

declare const TradingView: any;

@Component({
  selector: 'app-trade-view-widget',
  templateUrl: './trade-view-widget.component.html',
})
export class TradeViewWidgetComponent implements AfterViewInit, OnDestroy {

  constructor(private headerService: HeaderService) {
    this.headerService.generalPageHeader.next(false);
  }

  ngAfterViewInit(): void {
    new TradingView.widget(
      {
        'width': '100%',
        'height': '100%',
        'symbol': localStorage.getItem('symbol'),
        'timezone': 'Etc/UTC',
        'theme': 'dark',
        'style': '1',
        'locale': 'en',
        'enable_publishing': false,
        'withdateranges': true,
        'range': 'ytd',
        'hide_side_toolbar': false,
        'allow_symbol_change': false,
        'show_popup_button': false,
        'no_referral_id': true,
        'container_id': 'tradingview_bac65',
        overrides: {
          'paneProperties.background': '#2E2E2E',
        }
      }
    );
  }

  ngOnDestroy() {
    localStorage.removeItem('symbol');
  }

}
