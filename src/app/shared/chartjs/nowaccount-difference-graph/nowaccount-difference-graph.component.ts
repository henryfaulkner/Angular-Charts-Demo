import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClientDashboardItem } from 'src/app/core/types/client-dashboard-item.type';
import jsonData from 'src/assets/graph-json/nowaccount-difference.json';

@Component({
  selector: 'app-nowaccount-difference-graph',
  templateUrl: './nowaccount-difference-graph.component.html',
  styleUrls: ['./nowaccount-difference-graph.component.scss'],
})
export class NowaccountDifferenceGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() item: ClientDashboardItem;

  // double bar chart
  // x-axis: Customers
  // y-axis: lifetime invoice amount
  // purpose: Display the NowAccount Difference vs. Factoring.

  doubleBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: jsonData.xTitle,
        },
      },
      y: {
        ticks: {
          display: true,
          callback: function (value, index, values) {
            return `$${value}`;
          },
        },
        title: {
          display: true,
          text: jsonData.yTitle,
        },
      },
    },
  };

  doubleBarChartData: ChartData<'bar'> = {
    labels: jsonData.labels,
    datasets: jsonData.datasets,
  };

  doubleBarChartType: ChartType = 'bar';

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Force data binding update
    this.changeDetectorRef.detectChanges();
  }
}
