import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent, ApexAxisChartSeries, ApexChart, ApexYAxis, ApexXAxis, ApexTitleSubtitle, ApexTheme} from 'ng-apexcharts';
import {TradeService} from '../../../../services/userServices/trade.service';
import {HeaderService} from '../../../../services/header.service';
import {SocketService} from '../../../../services/socket.service';
import {UserAccountService} from '../../../../services/userServices/user-account.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-trade-apex-widget',
  templateUrl: './trade-apex-widget.component.html',
  styleUrls: ['./trade-apex-widget.component.scss']
})
export class TradeApexWidgetComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  constructor(public tradeService: TradeService,
              private headerService: HeaderService,
              private socketService: SocketService,
              private userService: UserAccountService) {
    this.tradeService.getCustomGraphicData();
    this.headerService.generalPageHeader.next(false);
  }

  ngOnInit(): void {
    this.socketService.getSocketSymbolData().subscribe((res: any) => {
      this.userService.getSymbolsUpdatedSettings(res);
    });
  }

}
