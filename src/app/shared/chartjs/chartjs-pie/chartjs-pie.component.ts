import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WeatherDataService } from 'src/app/core/services/weather-data.service';

@Component({
  selector: 'app-chartjs-pie',
  templateUrl: './chartjs-pie.component.html',
  styleUrls: ['./chartjs-pie.component.scss'],
})
export class ChartjsPieComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };
  public pieChartType: ChartType = 'pie';

  constructor(private wds: WeatherDataService) {}

  ngOnInit(): void {}
}
