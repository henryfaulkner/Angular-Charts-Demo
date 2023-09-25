import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDatasetVectorAndLabel } from 'src/app/core/types/chart-dataset-vector-and-label.type';

@Component({
  selector: 'app-chartjs-pie',
  templateUrl: './chartjs-pie.component.html',
  styleUrls: ['./chartjs-pie.component.scss'],
})
export class ChartjsPieComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() labels: string[] = [];
  @Input() datasets: ChartDatasetVectorAndLabel[] = [];

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };
  pieChartPlugins = [DatalabelsPlugin];

  ngOnChanges(): void {
    const labels = this.labels;
    const datasets = this.datasets;
    this.pieChartData = {
      labels,
      datasets,
    };
  }
}
