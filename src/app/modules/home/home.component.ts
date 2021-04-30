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
    sales: []
  };
  dataLoaded = false;
  legendPosition = 'below';
  showLegend = true;

  constructor(private api: ApiService, private authState: AuthStateService) { }

  ngOnInit(): void {
    this.api.select<StatsResponse>('stats')
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
  value: number;
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
