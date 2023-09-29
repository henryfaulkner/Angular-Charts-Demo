import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { ChartModel } from 'src/app/core/models/chart.model';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';

@Component({
  selector: 'app-chartjs-bar',
  templateUrl: './chartjs-bar.component.html',
  styleUrls: ['./chartjs-bar.component.scss'],
})
export class ChartjsBarComponent extends ChartModel implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() labels: string[] = [];
  @Input() datasets: ChartDatasetVectorAndLabel[] = [];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
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
      tooltip: { enabled: true },
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

  constructor() {
    super();
  }

  ngOnChanges() {
    const labels = this.labels;
    const datasets = this.datasets;
    this.barChartData = {
      labels,
      datasets,
    };
  }
}
