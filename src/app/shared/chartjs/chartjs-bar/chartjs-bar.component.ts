import { Component, Input, OnChanges, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
    // We use these empty structures as placeholders for dynamic theming.

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
    },
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };

  ngOnChanges() {
    const labels = this.labels;
    const datasets = this.datasets;
    this.barChartData = {
      labels,
      datasets: datasets,
    };
  }
}
