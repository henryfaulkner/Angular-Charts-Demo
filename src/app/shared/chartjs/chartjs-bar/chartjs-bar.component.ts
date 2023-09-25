import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';

@Component({
  selector: 'app-chartjs-bar',
  templateUrl: './chartjs-bar.component.html',
  styleUrls: ['./chartjs-bar.component.scss'],
})
export class ChartjsBarComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() labels: string[] = [];
  @Input() datasets: ChartDatasetVectorAndLabel[] = [];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  barChartPlugins = [DatalabelsPlugin];

  ngOnChanges() {
    console.log(this.labels);
    console.log(this.datasets);
    const labels = this.labels;
    const datasets = this.datasets;
    this.barChartData = {
      labels,
      datasets,
    };
  }
}
