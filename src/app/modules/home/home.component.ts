import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/services/api/api.service';
import { AuthStateService } from './../../shared/services/auth/auth-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: ChartDataObject = {
    invoiceCount: [],
    bankPayment: [],
    sales: [],
    monthlyData: []
  };
  dataLoaded = false;
  legendPosition = 'below';
  xAxisLabel = 'Date';
  yAxisLabel = 'Amount';
  booleanTrue = true;

  constructor(private api: ApiService, private authState: AuthStateService) { }

  ngOnInit(): void {
    this.api.select<StatsResponse>('dailyStats')
    .subscribe(
      (response) => {
        this.data.invoiceCount.push({name: this.name, value: response.invoiceCount.mine});
        this.data.invoiceCount.push({name: 'Others', value: response.invoiceCount.total - response.invoiceCount.mine});
        this.data.bankPayment.push({name: this.name, value: response.bankPayment.mine});
        this.data.bankPayment.push({name: 'Others', value: response.bankPayment.total - response.bankPayment.mine});
        this.data.sales.push({name: this.name, value: response.sales.mine});
        this.data.sales.push({name: 'Others', value: response.sales.total - response.sales.mine});
        this.dataLoaded = true;
      }
    );

    this.api.select<ChartData[]>('monthlyStats')
    .subscribe(
      (response) => {
        console.log(response);
        this.data.monthlyData = [
          {
            name: 'Daily Invoice Amount',
            series: response
          }
        ]
      }
    );
  }

  get name(): string {
    return this.authState.displayName;
  }
}

interface ChartDataObject {
  [key: string]: ChartData[];
}

interface ChartData {
  name: string;
  value?: number;
  series?: ChartData[];
}

interface StatsResponse {
  invoiceCount: {
    total: number;
    mine: number;
  };
  bankPayment: {
    total: number;
    mine: number;
  };
  sales: {
    total: number;
    mine: number;
  };
}
