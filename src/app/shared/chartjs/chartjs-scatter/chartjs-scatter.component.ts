import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartModel } from 'src/app/core/models/chart.model';

@Component({
  selector: 'app-chartjs-scatter',
  templateUrl: './chartjs-scatter.component.html',
  styleUrls: ['./chartjs-scatter.component.scss'],
})
export class ChartjsScatterComponent extends ChartModel {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  scatterChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  scatterChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ];
  scatterChartData: ChartData<'scatter'> = {
    labels: this.scatterChartLabels,
    datasets: [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: -2 },
          { x: 4, y: 4 },
          { x: 5, y: -3 },
        ],
        label: 'Series A',
        pointRadius: 10,
      },
    ],
  };
  scatterChartType: ChartType = 'scatter';

  constructor() {
    super();
  }
}
